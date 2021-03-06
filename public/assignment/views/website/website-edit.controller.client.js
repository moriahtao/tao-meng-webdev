(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        var websiteId = $routeParams.wid;
        vm. userId = $routeParams.uid;
        vm. websiteEdit = websiteEdit;
        vm. websiteDelete = websiteDelete;

       function init() {
           var promise = WebsiteService.findWebsiteById(websiteId);
           promise
               .success(function (website) {
                       vm.website = website;
               })
               .error(function (error) {

               });
           var promise2 = WebsiteService.findAllWebsitesForUser(vm.userId);
           promise2
               .success(function (user) {
                   vm.websites = user.websites;
               })
               .error(function(error){

               });
        }
        init();

        function websiteEdit(){
            if(vm.myForm.$invalid == true){
                vm.error = "Please enter a valid website name";
                vm.alert = "* Required Field";

            }else{
            var promise = WebsiteService.updateWebsite(websiteId, vm.website);
            promise
                .success(function(){
                    $location.url("/user/" + vm.userId+"/website");
                })
                .error(function(){

            })}
        }

        function websiteDelete(websiteId){
            var promise = WebsiteService.deleteWebsite(websiteId);
            promise
                .success(function(){
                    $location.url("/user/" + vm.userId+"/website");
                })
                .error(function(){

                })
        }
    }
})();
