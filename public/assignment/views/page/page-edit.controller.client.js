(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;
        vm. websiteId = $routeParams.wid;
        vm. userId = $routeParams.uid;
        vm. pageId = $routeParams.pid;
        vm. editPage = editPage;
        vm.deletePage = deletePage;

        function init(){
            var promise = PageService.findAllPagesForWebsite(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (error){

                });

            var promise2 = PageService.findPageById(vm.pageId);
            promise2
                .success(function (page) {
                    vm.page = page;
                })
                .error(function (error){

                });
        }
        init();


        function editPage(page){
            var promise = PageService.updatePage(vm.pageId, vm.page);
            promise
                .success(function(){
                    $location.url("/user/" + vm.userId+"/website/" + vm.websiteId + "/page");
                })
                .error(function(){

                });
        }

        function deletePage(pid){
            var promise = PageService.deletePage(pid);
            promise
                .success(function(){
                    $location.url("/user/" + vm.userId+"/website/" + vm.websiteId + "/page");
                })
                .error(function(){

                });
        }
    }
})();
