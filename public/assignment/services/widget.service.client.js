(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
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

        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;
        /*!!!remember*/

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url =  "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
            //widgets.push(widget);
            //return widgets;
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    switch (widget.widgetType){
                        case"HEADER":
                            widgets[w].name = widget.name;
                            widgets[w].text = widget.text;
                            widgets[w].size = widget.size;
                            return true;
                        case"YOUTUBE":
                            widgets[w].name = widget.name;
                            widgets[w].text = widget.text;
                            widgets[w].url = widget.url;
                            widgets[w].width = widget.width;
                            return true;
                        case"IMAGE":
                            widgets[w].name = widget.name;
                            widgets[w].text = widget.text;
                            widgets[w].url = widget.url;
                            widgets[w].width = widget.width;
                            return true;


                    }
                }
            }
            return null

        }
        function deleteWidget(widgetId){
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    websites.splice(w,1);
                    return true;
                }
            }
            return null;
        }

    }
})();
