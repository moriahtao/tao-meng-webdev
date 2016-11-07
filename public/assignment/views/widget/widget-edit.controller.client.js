(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise
                .success(function (widget) {
                    vm.widget = widget;
                    //alert(vm.widget.widgetType);
                })
                .error(function (error) {

                });
           // vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function deleteWidget() {
            var promise =  WidgetService.deleteWidget(vm.widgetId);
            promise
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function (error) {

                });


        }

        function updateWidget(widget) {
            var promise =  WidgetService.updateWidget(vm.widgetId, widget);
            promise
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function (error) {

                });

           // WidgetService.updateWidget(vm.widgetId, widget);
            //$location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();