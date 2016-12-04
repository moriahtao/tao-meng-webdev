(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    /*everything inside an html is a scope*/
    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;

        function login(name, psd) {
            if(vm.myForm.$invalid == true){
                vm.error = "Please check and resubmit!";
                vm.alert = "* Required Field";
            }else{
            //var promise = UserService.findUserByCredentials(name,psd);
            var promise = UserService.login(name,psd);
            promise
                .success(function(user){
                    if (user === '0') {
                        vm.error = "No such user";
                    }
                    else{
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function(bbb){
                    console.log(bbb);
                })
            }
        }
    }
})();
