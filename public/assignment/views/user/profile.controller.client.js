(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            var promise = UserService.findUserById(userId);
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
            UserService.deleteUser(vm.userId)
                .success(function (user) {
                    $location.url("/login");

                })
                .error(function () {

                })

        }


        function updateUser() {
            UserService.updateUser(vm.user);
            /* var found = UserService.updateUser(userId, user);

             if (found){
             vm.error = "Update Successfully"
             }
             else{
             vm.error = "Oops! Cannot update your profile!"
             }*/
        }

    }


})();
