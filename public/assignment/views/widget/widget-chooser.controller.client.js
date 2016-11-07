(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.createCorrespondingWidget = createCorrespondingWidget;

        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function (error) {

                });
            //vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function createCorrespondingWidget(pageId,type) {
           var newWidget = {
                _id: (new Date()).getTime()+"",
                widgetType: type+"",
                pageId: pageId
            };
           var promise =   WidgetService.createWidget(pageId, newWidget);
            promise
                .success(function () {
                    $location.url("user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
                })
                .error(function (error){

                });
            //WidgetService.createWidget(pageId, newWidget);
            //$location.url("user/"+ vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }
})();