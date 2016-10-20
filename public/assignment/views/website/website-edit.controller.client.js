(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        var websiteId = $routeParams.wid;
        vm. userId = $routeParams.uid;
        vm. websiteEdit = websiteEdit;

        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function websiteEdit(website){
            WebsiteService.updateWebsite(websiteId, website);
            $location.url("/user/" + vm.userId+"/website");
        }
    }
})();
