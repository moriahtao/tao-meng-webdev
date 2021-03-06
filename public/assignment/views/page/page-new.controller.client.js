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
           // page.dateCreated = new Date().getTime();
            //page.websiteId = vm.websiteId;
            if(vm.myForm.$invalid == true){
                vm.error = "Please enter a valid page name";
                vm.alert = "* Required Field";

            }else{
            var promise =  PageService.createPage(vm.websiteId, page);
            promise
                .success(function () {
                    $location.url("/user/" + vm.userId+"/website/" + vm.websiteId + "/page");
                })
                .error(function (error){

                });

        }}


    }
})();
