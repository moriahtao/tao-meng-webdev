(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http){
        /*var users= [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];*/


        var api={
            findUserByCredentials: findUserByCredentials,
            findCurrentUser: findCurrentUser,
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLogin: checkLogin,
            logout: logout,
            register: register


        };
        return api;
        
        function register(user) {
            return $http.post("/api/register", user);

        }
        function findCurrentUser() {
            var url = "/api/user/";
            return $http.get(url);
        }

        function logout() {
            return $http.post("/api/logout");
        }
        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function login(username, password){
            var user = {
                username: username,
                password: password

            };
            return $http.post("/api/login", user);

        }

        function findUserByCredentials(name,psd){
            var url = '/api/user?username=' + name + '&password=' + psd;
            return $http.get(url);//remember to return
        }

        function findUserById(id){
            var url = '/api/user/' + id;
            return $http.get(url);
        }
       function createUser(user){
            var newUser = {
                username: user.username,
                password: user.password,
                dateCreated: new Date().getTime()
            };
            return $http.post("/api/user" , newUser);
        }
        function findUserByUsername(username){
            var url = '/api/user?username=' + username;
            return $http.get(url);
        }

        function updateUser(user){
            var url = "/api/user/" + user._id;
            $http.put(url, user);//payload
        }
        function deleteUser(uid){
            var url = "/api/user/" + uid;
            return $http.delete(url);//need return the promise

        }
    }
})();
