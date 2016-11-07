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
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put('/api/widget/:widgetId', updateWidget);

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

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w,1);
                res.send(200);
                return
            }
        }
        res.send('0');
    }
    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                switch (widget.widgetType) {
                    case"HEADER":
                        widgets[w].name = widget.name;
                        widgets[w].text = widget.text;
                        widgets[w].size = widget.size;
                        res.send(200);
                        return;
                    case"YOUTUBE":
                        widgets[w].name = widget.name;
                        widgets[w].text = widget.text;
                        widgets[w].url = widget.url;
                        widgets[w].width = widget.width;
                        res.send(200);
                        return;
                    case"IMAGE":
                        widgets[w].name = widget.name;
                        widgets[w].text = widget.text;
                        widgets[w].url = widget.url;
                        widgets[w].width = widget.width;
                        res.send(200);
                        return;
                }
            }
        }
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



