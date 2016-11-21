module.exports= function(){
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');

    var userModel = require("./user/user.model.server.js")();

    var model = {
      userModel: userModel
    };
    return model;
};