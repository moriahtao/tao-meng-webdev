module.exports = function (app, model) {

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.get('/api/page/:pid/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId',findWidgetById );
    app.post('/api/page/:pid/widget', createWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put('/api/widget/:widgetId', updateWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/api/page/:pid/widget', sort);

    function sort(req, res){
        var start = req.query.start;
        var end = req.query.end;
        var pageId = req.params.pid;
        model
            .widgetModel
            .sort(start, end, pageId)
            .then(function (status) {
                res.send(200);
            },
            function (err) {
                res.sendStatus(400).send(err);
            });
        /*var start = req.query.start;
        var end = req.query.end;
        console.log([start, end]);
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);*/
    }


    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var userId      = req.body.userId;
        var websiteId      = req.body.websiteId;
        var pageId      = req.body.pageId;
    /*
        var userId      = req.body.userId;
        var websiteId      = req.body.websiteId;
        var pageId      = req.body.pageId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets){
            if(widgets[i]._id === widgetId){
                widgets[i].url = "/uploads/"+ filename;
            }
        }*/
        model.widgetModel
            .uploadImage(widgetId, req)
            .then(function (status) {
                res.send(status);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });

        res.redirect("/assignment/#/user/"+ userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;
        model
            .widgetModel
            .findAllWidgetsForPage(pid)
            .then(function (pageObj) {
                res.send(pageObj);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });

    }
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
       model
           .widgetModel
           .findWidgetById(widgetId)
           .then(function (widget) {
               res.send(widget);
           },
           function (error) {
               res.sendStatus(400).send(error);
           })
    }
    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pid;
        model
            .widgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
                res.send(widget);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });

    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
       model
           .widgetModel
           .deleteWidget(widgetId)
           .then(function (status) {
               res.send(200);
           },
           function (error) {
               res.sendStatus(400).send(error);
           });
    }
    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(function (status) {
                res.send(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }
    /*  function createWebsite(req, res) {
          var newWebsite = req.body;
          websites.push(newWebsite);
          res.send(websites);
      }





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


      }*/



};



