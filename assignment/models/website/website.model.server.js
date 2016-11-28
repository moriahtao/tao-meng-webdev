module.exports = function () {
    var model = {};
  var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        findAllWebsitesForUser: findAllWebsitesForUser,
        createWebsite: createWebsite,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findAllPagesForWebsite: findAllPagesForWebsite,
        setModel: setModel
    };
    return api;

    function setModel(_model){
        model =  _model;
    }
    function findAllPagesForWebsite(websiteId) {
        return WebsiteModel
            .findById(websiteId)
            .populate("pages")
            .exec();// return websiteObj
    }

    function findAllWebsitesForUser(uid) {
        return model.userModel.findAllWebsitesForUser(uid);

    }

    function createWebsite(uid, website) {
        return WebsiteModel
            .create(website)
            .then(function(websiteObj){
                model
                    .userModel
                    .findUserById(uid)//returns an object
                    .then(function(userObj) {
                        userObj.websites.push(websiteObj);
                        websiteObj._user = userObj._id;
                            userObj.save();
                            return websiteObj.save();//in the previous all the operations only exists in the RAM,
                        // here we need to put it actually into the database
                       // return websiteObj;
                    },
                    function (error) {
                        console.log(error);
                    });
            });
    }

    function findWebsiteById(websiteId){
        return WebsiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website){
        return WebsiteModel
            .update(
                {
                    _id: websiteId
                },
                {
                    name: website.name,
                    description: website.description
                }
                );

    }
    function deleteWebsite(websiteId) {
        return WebsiteModel
                .findById(websiteId)
                .then(function (websiteObj) {

                    model.userModel.findUserById(websiteObj._user)
                        .then(function (userObj) {
                            var wIndex = userObj.websites.indexOf(websiteId);
                            userObj.websites.splice(wIndex,1);
                            return userObj.save();

                           // return userObj.save();

                        });
                    return WebsiteModel.remove({
                        _id:websiteId
                    });


                });


        /*return WebsiteModel
            .remove(
                {
                    _id: websiteId
                }
            );*/
    }


};