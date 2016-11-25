(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams,WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;



        function init(){
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise
                .success(function (user) {
                        vm.websites = user.websites;
                })
                .error(function (error){

                })
        }
        init();
    }
})();
