module.exports = function (app) {

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

    app.get('/api/page/:pid/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId',findWidgetById );
    app.post('/api/page/:pid/widget', createWidget);

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;
        var result = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pid) {
                result.push(widgets[w]);
            }
        }
        res.json(result);

    }
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            var widget = widgets[w];
            if (widgets[w]._id === widgetId) {
                res.send(widget);
                return;
            }
        }
        res.send('0');
    }
    function createWidget(req, res) {
        var newWidget = req.body;
        widgets.push(newWidget);
        res.send(200);
    }


    /*  function createWebsite(req, res) {
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

      function deleteWebsite(req,res){
          var wid = req.params.wid;
          for (var w in websites) {
              if (websites[w]._id === wid) {
                  websites.splice(w,1);
                  res.send(200);
                  return
              }
          }
          res.send('0');
      }*/



};



