module.exports = function(app, model) {

    var passport      = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');
    var bcrypt = require("bcrypt-nodejs");//encrypt passwords
    passport.use(new LocalStrategy(localStrategy));//when the login comes in, this is the local strategy to verify
    //password and username periodically, and store psw and usrn for some time
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());

    app.use(passport.initialize());
    app.use(passport.session());
    var users= [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    // node.js allows us to make the request been handled by several functions,
    // so the handler before login can execute before login
    app.post('/api/login', passport.authenticate('local'),login);//we want the passport to intercept the login,
    // handle the username and password, if it is successful, then logged in. The strategy here is called 'local',
    // it can be called any name, but local is the standard key refer to local strategy.
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/user', createUser);
    app.post('/api/register', register);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', loggedInAndSelf, updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.post('/api/logout', logout);
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));



    var googleConfig = {
        clientID     : "558988847579-9ehg50lkohmklqi2742g22ggcu6aee8v.apps.googleusercontent.com",
        clientSecret : "JMR5JVsG-58HWD7ySGa81vFK",
        callbackURL  : 'http://127.0.0.1:3000/auth/google/callback'
    };
    var facebookConfig = {
        clientID     : "225840347842058",
        clientSecret : "f54e98ec25a5677fdf93053ab9075027",
        callbackURL  : 'http://localhost:3000/auth/facebook/callback'
    };
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function register (req, res) {
        var user = req.body;
        var salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password,salt);
        model
            .userModel
            .createUser(user)
            .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }

    function loggedInAndSelf(req,res,next) {
        var loggedin = req.isAuthenticated();
        var UserId = req.params.uid;
        var self = UserId == req.user._id;
        if(self && loggedin){
            next();
        }else{
            res.sendStatus(400).send("Not the same person!");
        }

    }
    function facebookStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newFacebookUser = {
                            username:  profile.displayName,
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }
    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        model
            .userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function logout(req, res) {
        req.logout();//passport function
        res.send(200);
    }


    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    //password = bcrypt.hashSync(password);
                    //console.log(password);
                    //console.log(user.password);
                    //call back function, passed to us and then call back
                    if(user && bcrypt.compareSync(password, user.password)){
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        res.sendStatus(400).send(err);
                    }
                }
            );
    }//this function is going to intercept before login is called
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    


    function updateUser(req,res){
        var user = req.body;
        var uid = req.params.uid;
       /* for(var u in users){
            if(users[u]._id === uid){
                users[u] = user;
            }
        }*/
       model
           .userModel
           .updateUser(uid, user)
           .then(
               function(status){
                   res.send(200);
               },
               function(error){
                   res.sendStatus(400).send(error);
               }
           );
    }
    function deleteUser(req,res){
        var uid = req.params.uid;
        model
            .userModel
            .deleteUser(uid)
            .then(
                function(status){
                    res.send(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );

      /*  for(var u in users){
            if(users[u]._id === uid){
                users.splice(u, 1);
            }
        }
        res.send(200);*/
    }

    function createUser(req, res){
        var newUser = req.body;
        /*newUser._id = (new Date()).getTime()+"";
        users.push(newUser);*/
        model
            .userModel
            .createUser(newUser)
            .then(
                function(newUser){
                    res.send(newUser);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }
    function findUserById(req, res){
        var userId = req.params.uid;
        model
            .userModel
            .findUserById(userId)
            .then(
                function(user){
                    if(user){
                        res.send(user);
                    }
                    else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
        /*for ( var u in users){
            if(users[u]._id === userId){
                res.send(users[u]);
            }
        }
        res.send('0');*/
    }
    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if (query.password && query.username) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        }else{
            res.json(req.user);//passport made user in the request available once logged in
        }
    }
      function findUserByUsername(req, res){
          var username = req.query.username;
          model
              .userModel
              .findUserByUsername(username)
              .then(
                  function(users){
                      if(users)
                      {
                          res.json(users[0]);
                      }
                      else{
                          res.send('0');
                      }
                  },
                  function(error){
                      res.sendStatus(400).send(error);
                  }
              );
         /* for ( var u in users){
              if(users[u].username === username){
                  res.send(users[u]);
              }
          }
          res.send('0');*/
      }
      function findUserByCredentials(req, res){
          var username = req.query.username;
          var psd = req.query.password;
          model
              .userModel
              .findUserByCredentials(username, psd)
              .then(
                  function(users){
                      if(users)
                      {
                          res.json(users[0]);
                      }
                      else{
                          res.send('0');
                      }

                  },
                  function(error){
                      res.sendStatus(400).send(error);
                  }
              );
         /* for(var u in users){
              if(users[u].username === username && users[u].password === psd){
                  res.send(users[u]);
              }
          }
          res.send('0');*/
      }


};

