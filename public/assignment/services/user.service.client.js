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
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser

        };
        return api;

        function findUserByCredentials(name,psd){
            var url = '/api/user?username=' + name + '&password=' + psd;
            return $http.get(url);//remember to return
          /*  for (var u in users) {
                user = users[u];
                if (user.username === name && user.password === psd) {
                   return user;
                }
            }
            return null;*/
        }

        function findUserById(id){
            var url = '/api/user/' + id;
            return $http.get(url);
           /* for(var u in users){
                user = users[u];
                if(user._id === id){
                    return user;
                }
            }
            return null;*/
        }
       function createUser(user){
            var newUser = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/user" , newUser);
            /*if(findUserByUsername(user.username)){
                    return null;
                }
                else{
                    var newUser = {
                        _id: (new Date()).getTime()+"",
                        username: user.username,
                        password: user.password,
                        firstName: "",
                        lastName: ""
                    };

                users.push(newUser);
                return newUser;
            }*/
        }
        function findUserByUsername(username){
            for (var u in users) {
                user = users[u];
                if (user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(user){
            var url = "/api/user/" + user._id;
            $http.put(url, user);//payload
           /* for (var u in users) {
                if ( users[u]._id === userId) {
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    return true;
                }
            }
            return false;*/
        }
        function deleteUser(uid){
            var url = "/api/user/" + uid;
            return $http.delete(url);//need return the promise
            /*for (var u in users) {
                if ( users[u]._id === userId) {
                   users.splice(u, 1);
                    return true
                }
            }
            return null*/
        }
    }
})();
