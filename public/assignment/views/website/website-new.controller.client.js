(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams,WebsiteService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init(){
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (error){

                })
        }
        init();

        function createWebsite(website){
            website._id = (new Date()).getTime() + "";
            website.developerId = vm.userId;
            var promise =  WebsiteService.createWebsite(vm.userId, website);
            promise
                .success(function () {
                    $location.url("/user/" + vm.userId+"/website");
                })
                .error(function (error){

                });
            /*var success = WebsiteService.createWebsite(vm.userId, website);
            if(success){
                $location.url("/user/" + vm.userId+"/website");
            }
            else{
                vm.error="Oops! Cannot add new website!"
            }*/
        }
    }
})();
