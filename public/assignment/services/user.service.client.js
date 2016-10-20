(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService(){
        var users= [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];


        var api={
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser

        };
        return api;

        function findUserByCredentials(name,psd){
            for (var u in users) {
                user = users[u];
                if (user.username === name && user.password === psd) {
                   return user;
                }
            }
            return null;
        }

        function findUserById(id){
            for(var u in users){
                user = users[u];
                if(user._id === id){
                    return user;
                }
            }
            return null;
        }
        function createUser(user){
            if(findUserByUsername(user.username)){
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
            }
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

        function updateUser(userId, user){
            for (var u in users) {
                if ( users[u]._id === userId) {
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    return true;
                }
            }
            return false;
        }
        function deleteUser(userId){
            for (var u in users) {
                if ( users[u]._id === userId) {
                   users.splice(u, 1);
                    return true
                }
            }
            return null
        }
    }
})();
