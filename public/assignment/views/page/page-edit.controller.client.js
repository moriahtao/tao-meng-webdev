(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;
        vm. websiteId = $routeParams.wid;
        vm. userId = $routeParams.uid;
        var pageId = $routeParams.pid;
        vm. editPage = editPage;
        vm.deletePage = deletePage;

        function init(){
            vm.pages = PageService.findPagesByWebsiteId(vm. websiteId);
            vm.page = PageService.findPageById(pageId);
        }
        init();


        function editPage(page){
            var success = PageService.updatePage(pageId, page);
            if(success){
                $location.url("/user/" + vm.userId+"/website/" + vm.websiteId + "/page");
            }
            else{
                vm.error("Oops! Cannot update page!")
            }
        }

        function deletePage(pid){
            PageService.deletePage(pageId);
            $location.url("/user/" + vm.userId+"/website/" + vm.websiteId + "/page");
        }
    }
})();
