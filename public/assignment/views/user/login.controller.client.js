(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    /*everything inside an html is a scope*/
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(name, psd) {

            var promise = UserService.findUserByCredentials(name,psd);
            promise
                .success(function(user){
                    if (user === '0') {
                        vm.error = "No such user";
                    }
                    else{
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function(bbb){
console.log(bbb);
                })


        }
    }
})();
