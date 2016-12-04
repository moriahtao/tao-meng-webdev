module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("../website/website.schema.server.js");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        google: {
            id: String,
            token: String,
            email: String
        },
        facebook:{
            id: String,
            token: String
        },
        websites: [{type:mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],//collection of object, can be actual instances of websites,
        dateCreated: Date// or the reference of instance of websites, here we use the reference
        // 'WebsiteModel' refers to the WebsiteModel in website.model.server.js
    },{collection: "user"});
    return UserSchema;
};