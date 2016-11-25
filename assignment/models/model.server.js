module.exports= function(){
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');

    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel
    };

    websiteModel.setModel(model);
    userModel.setModel(model);

    return model;
};