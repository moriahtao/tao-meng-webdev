module.exports = function (app, model) {

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
    app.delete('/api/website/:wid',deleteWebsite);

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.uid;
        model
            .websiteModel
            .findAllWebsitesForUser(uid)
            .then(function (websites) {
                res.json(websites);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
       /* var result = [];
        for (var w in websites) {
            if (websites[w].developerId === uid) {
                result.push(websites[w]);
            }
        }
        res.json(result);*/
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;

        model
            .websiteModel
            .createWebsite(req.params.uid, newWebsite)
            .then(
                function(newWebsite){
                    res.send(newWebsite);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
       /* websites.push(newWebsite);
        res.send(websites);*/
    }


    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                if(website){
                    res.send(website);
                }
                else{res.send('0');}
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
        /*for (var w in websites) {
            var website = websites[w];
            if (websites[w]._id === websiteId) {
                res.send(website);
                return;
            }
        }
        res.send('0');*/
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = req.params.wid;
        model
            .websiteModel
            .updateWebsite(wid, website)
            .then(function (status) {
                res.send(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function deleteWebsite(req,res){
     var wid = req.params.wid;
       model
           .websiteModel
           .deleteWebsite(wid)
           .then(function (status) {
               res.send(200);
           },
           function (error) {
               res.sendStatus(400).send(error);
           })
     }



};


