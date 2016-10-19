(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    /*everything inside an html is a scope*/
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(name, psd) {

            var user = UserService.findUserByCredentials(name,psd);
            if (user === null)
                vm.error = "No such user";
            else{
                $location.url("/user/" + user._id);
            }
        }
    }
})();
