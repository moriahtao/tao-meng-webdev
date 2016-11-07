module.exports = function (app) {

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
        var result = [];
        for (var p in pages) {
            if (pages[p].websiteId === wid) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

        function findPageById(req, res) {
            var pid = req.params.pid;
            for(var p in pages){
                var page = pages[p];
                if(page._id === pid){
                    res.send(pages[p]);
                    return;
                }
            }
            res.send('0');
        }
    function createPage(req, res) {
        var newPage = req.body;
        pages.push(newPage);
        res.send(pages);
    }
    function updatePage(req, res) {
        var page = req.body;
        var pid = req.params.pid;
        for (var p in pages) {
            if (pages[p]._id === pid) {
                pages[p].name = page.name;
                pages[p].description = page.description;
            }
            res.send(pages[p]);
            return;
        }
        res.send('0');
    }
    function deletePage(req,res){
        var pid = req.params.pid;
        for(var p in pages){
            if(pages[p]._id === pid){
                pages.splice(p, 1);
                res.send(200);
                return;
            }
        }
        res.send('0');
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


