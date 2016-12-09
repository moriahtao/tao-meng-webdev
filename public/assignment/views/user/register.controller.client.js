(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(vm.myForm.$invalid == true){
                vm.error = "Please check and resubmit!";
                vm.alert = "* Required Field";
                vm.vpsdAlert = "Passwords don't match!";
            } else if(user.password !== user.verpass){
                vm.error = "Please check and resubmit!";
                vm.alert = "* Required Field";
                vm.vpsdAlert = "Passwords don't match!";
            }
            else {
                UserService
                    .register(user)
                    .success(function (newUser) {
                       // $rootScope.currentUser = newUser;
                        $location.url("/user/" + newUser._id);
                    })
                    .error(function (error) {
                        vm.error="Oops! Username already exists!"
                    });
            }
            /* if(user.password!=user.vpassword){
             vm.error="Passwords don't match!";
             }
             else{
             var newUser = UserService.createUser(user);
             if(newUser){
             $location.url("/user/" + newUser._id);
             }
             else{
             vm.error="Oops! Username already exists!"
             }
             }*/

        }

    }
})();