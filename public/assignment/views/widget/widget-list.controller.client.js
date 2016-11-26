(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController );

    function WidgetListController($routeParams, WidgetService,$sce){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;

        function init(){
            var promise = WidgetService.findWidgetsByPageId(vm.pageId);
            promise
                .success(function (page) {
                    vm.widgets = page.widgets;
                })
                .error(function (error){

                });
            //vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();/*remember to execute init()!!!*/

        function checkSafeHtml(html){
            return $sce.trustAsHtml(html);
        }
        function checkSafeYoutubeUrl(url){
            var parts = url.split('/');
            var id = parts[parts.length-1];

            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

    }
})();
