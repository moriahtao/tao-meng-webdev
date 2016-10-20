(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams,WebsiteService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.newWebsite = newWebsite;

        function init(){
            vm.websites=WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function newWebsite(website){
            var success = WebsiteService.createWebsite(vm.userId, website);
            if(success){
                $location.url("/user/" + vm.userId+"/website");
            }
            else{
                vm.error="Oops! Cannot add new website!"
            }
        }
    }
})();
