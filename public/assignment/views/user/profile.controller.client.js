(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            var promise = UserService.findCurrentUser();
            promise
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function () {

                })
        }

        init();
        function deleteUser() {
            UserService.deleteUser(userId);
                /*.success(function (user) {
                    $location.url("/login");

                })
                .error(function () {

                })*/

        }



        function updateUser() {
            UserService
                .updateUser(vm.user)
                .then(function (response) {

                },
                function () {
                   vm.error =""
                });
            /* var found = UserService.updateUser(userId, user);

             if (found){
             vm.error = "Update Successfully"
             }
             else{
             vm.error = "Oops! Cannot update your profile!"
             }*/
        }
        function logout() {
            UserService.logout()
                .success(function () {
                    $rootScope.currentUser = null;
                    $location.url("login");
                });
        }


    }

})();
