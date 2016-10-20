(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService(){
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById
        };
        return api;/*!!!remember*/

        function findWidgetsByPageId(pageId){
            var result = [];
            for(var u in widgets){
                var widget = widgets[u];
                if (widget.pageId === pageId){
                    result.push(widget);
                }
            }
            return result;
        }
        function findWidgetById(widgetId){
            for (var u in widgets){
                if (widgets[u]._id === widgetId){
                    return widgets[u];
                }
            }
            return null
        }

    }
})();