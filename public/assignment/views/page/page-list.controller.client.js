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
            var promise = PageService.findAllPagesForWebsite(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (error){

                });

           var promise2 = PageService.findPageById(pageId);
            promise2
                .success(function (page) {
                    vm.page = page;
                })
                .error(function (error){

                });
            //vm.pages=PageService.findPagesByWebsiteId(vm.websiteId);
           // vm.page=PageService.findPageById(pageId);
        }
        init();
    }
})();

