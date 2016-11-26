module.exports = function (app, model) {

    var pages= [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }

    ];

    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.post('/api/website/:wid/page',createPage );
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.wid;
        model
            .pageModel
            .findAllPagesForWebsite(wid)
            .then(function (websiteObj) {
                res.send(websiteObj);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
        /*var result = [];
        for (var p in pages) {
            if (pages[p].websiteId === wid) {
                result.push(pages[p]);
            }
        }
        res.json(result);*/
    }

        function findPageById(req, res) {
            var pid = req.params.pid;
           model
               .pageModel
               .findPageById(pid)
               .then(function (pageObj) {
                   res.send(pageObj);
               },
               function (error) {
                   res.sendStatus(400).send(error);
               })
        }
    function createPage(req, res) {
        var wid = req.params.wid;
        var newPage = req.body;
       model
           .pageModel
           .createPage(wid, newPage)
           .then(function (page) {
               res.send(page);
           },
           function (error) {
               res.sendStatus(400).send(error);
           })
    }
    function updatePage(req, res) {
        var page = req.body;
        var pid = req.params.pid;
       model
           .pageModel
           .updatePage(pid, page)
           .then(function (status) {
               if(status){
                   res.send(200);
               }
               else{
                   res.send('0');
               }
           },
           function (error) {
               res.sendStatus(400).send(error);
           });
    }
    function deletePage(req,res){
        var pid = req.params.pid;
        model
            .pageModel
            .deletePage(pid)
            .then(function (status) {
                res.send(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            })

    }
/*
    function createWebsite(req, res) {
        var newWebsite = req.body;
        websites.push(newWebsite);
        res.send(websites);
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
            return;
        }
        res.send('0');
    }

    */



};


