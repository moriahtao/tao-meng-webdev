(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService){
        var vm = this;
        var userId = $routeParams.uid;
        vm.updateProfile = updateProfile;

        function init(){
            vm.user= UserService.findUserById(userId);
        }
        init();

        function updateProfile(user){
           var found = UserService.updateUser(userId, user);

            if (found){
                vm.error = "Update Successfully"
            }
            else{
                vm.error = "Oops! Cannot update your profile!"
            }
        }

    }



})();
