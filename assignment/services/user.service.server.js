module.exports = function(app) {

    var users= [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function deleteUser(req,res){
        var uid = req.params.uid;
        for(var u in users){
            if(users[u]._id === uid){
                users[u] = user;
            }
        }
        res.send(200);
    }
    function updateUser(req,res){
        var user = req.body;
        var uid = req.params.uid;
        for(var u in users){
            if(users[u]._id === uid){
                users.splice(u, 1);
            }
        }
        res.send(200);
    }

    function createUser(req, res){
        var newUser = req.body;
        newUser._id = (new Date()).getTime()+"";
        users.push(newUser);
        res.send(newUser);

    }
    function findUserById(req, res){
        var userId = req.params.uid;
        for ( var u in users){
            if(users[u]._id === userId){
                res.send(users[u]);
            }
        }
        res.send('0');
    }
    function findUser(req, res){
        var params = req.params;
        var query = req.query;
       if(query.password&&query.username){
           findUserByCredentials(req, res);
       }else if(query.username){
           findUserByUsername(req, res);
       }
      function findUserByUsername(req, res){
          var username = req.query.username;
          for ( var u in users){
              if(users[u].username === username){
                  res.send(users[u]);
              }
          }
          res.send('0');
      }
      function findUserByCredentials(req, res){
          var username = req.query.username;
          var psd = req.query.password;
          for(var u in users){
              if(users[u].username === username && users[u].password === psd){
                  res.send(users[u]);
              }
          }
          res.send('0');
      }

    }
};

