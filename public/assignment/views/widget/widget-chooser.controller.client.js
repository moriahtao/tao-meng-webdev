(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.widgetId;
        vm.createCorrespondingWidget = createCorrespondingWidget;

        function init() {
            /*var promise = WidgetService.findWidgetById(vm.widgetId);
            promise
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (error) {

                });*/
            //vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function createCorrespondingWidget(pageId,type) {
           var newWidget = {
                //_id: (new Date()).getTime()+"",
                type: type+""
                //pageId: pageId
            };
           var promise =   WidgetService.createWidget(pageId, newWidget);
            promise
                .success(function (widget) {
                    $location.url("user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                })
                .error(function (error){

                });
            //WidgetService.createWidget(pageId, newWidget);
            //$location.url("user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }
})();