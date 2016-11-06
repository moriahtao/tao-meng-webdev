module.exports = function (app) {

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];

    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.uid;
        var result = [];
        for (var w in websites) {
            if (websites[w].developerId === uid) {
                result.push(websites[w]);
            }
        }
        res.json(result);
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;
        websites.push(newWebsite);
        res.send(websites);
    }


    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;
        for (var w in websites) {
            var website = websites[w];
            if (websites[w]._id === websiteId) {
                res.send(website);
            }
        }
        res.send('0');
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = req.params.wid;
        for (var w in websites) {
            if (websites[w]._id === wid) {
                websites[w].name = website.name;
                websites[w].description = website.description;
            }
            res.send(websites[w]);
        }
        res.send('0');
    }

    /*function deleteUser(req,res){
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
     }*/


};


