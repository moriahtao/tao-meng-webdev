(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams,PageService) {
        var vm = this;
        vm. websiteId = $routeParams.wid;
        vm. userId = $routeParams.uid;
        var pageId = $routeParams.pid;



        function init(){
            vm.pages=PageService.findPagesByWebsiteId(vm.websiteId);
            vm.page=PageService.findPageById(pageId)
        }
        init();
    }
})();

