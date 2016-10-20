(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){
        var vm = this;
        vm. register = register;

        function register(user){
            if(user.password!=user.vpassword){
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
            }

        }

    }
})();