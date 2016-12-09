(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location, $scope) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;



        function init() {
            //vm.myFormHolder = {};
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

            if(vm.myForm.$invalid == true){
                vm.error = "Please check and resubmit!";
                vm.alert = "* Required Field";
            }else{
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
    }
})();