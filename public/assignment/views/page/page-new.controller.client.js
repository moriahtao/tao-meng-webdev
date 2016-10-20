(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.newPage = newPage;

        function newPage(page){
            PageService.createPage(vm.websiteId, page);
            $location.url("/user/" + vm.userId+"/website/" + vm.websiteId + "/page");

        }


    }
})();
