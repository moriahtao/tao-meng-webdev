/*user.schema needs to be loaded from a higher level abstraction: model
* model is going to encapsulate all the data access, interactions with the database
* the interactions and data access is using the schema, all those insertions, updates should follow schema*/
module.exports = function(){
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();/*the parenthesis at the last actually calls the function
    the require()only loads the function. var UserSchema actually reference to the schema(return UserSchema in
    user.schema.server.js), so it returns an instance of a UserSchema, so the schema is instantiated in a separate file*/
    var UserModel = mongoose.model("UserModel",UserSchema);/*use the model api to create a new instance of UserModel
    in terms of UserSchema, to delete, update, create user*/
    var api={
        createUser: createUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        findUserById: findUserById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        setModel: setModel
    };
    return api;

    function findUserByGoogleId(googleId) {
        return UserModel
            .findOne({
                "google.id": googleId
            });
        
    }
    function findUserByFacebookId(facebookId) {
        return UserModel
            .findOne({
                "facebook.id": facebookId
            });
    }
    function setModel(_model){
        model =  _model;
    }//passs the model to every model so that everybody has the excess to every model

    function findAllWebsitesForUser(uid){
        return UserModel
            .findById(uid)
            .populate("websites")
            .exec();

    }
    function findUserById(userId){
        //UserModel.find({_id: userId});--> returns an array
        return UserModel.findById(userId);//--> returns an object
    }
    function createUser(user) {
        return UserModel.create(user);
    }
    function updateUser(uid, user){
        return UserModel
            .update(
                {
                    _id: uid
                },//first one is the filter, the second one is the real json object
                {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            );
    }
    function findUserByUsername(name){
        return UserModel.findOne({//also if sure there is only one result, can write as findOne({})
            username: name
        });

    }
    function findUserByCredentials(name, psd){
        return UserModel.findOne({//also if sure there is only one result, can write as findOne({})
            username: name,
            password: psd
        });

    }
    function deleteUser(uid){
        return UserModel.remove({
            _id: uid
        });
    }


};


