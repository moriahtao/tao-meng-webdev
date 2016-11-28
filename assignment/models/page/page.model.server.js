module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        findAllPagesForWebsite: findAllPagesForWebsite,
        findAllWidgetsForPage: findAllWidgetsForPage,
        createPage: createPage,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }
    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }
    function findAllWidgetsForPage(pageId) {
        return PageModel
            .findById(pageId)
            .populate("widgets")
            .exec();// return pageObj
    }
    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(function (pageObj) {
                model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (websiteObj) {
                        websiteObj.pages.push(pageObj);
                        pageObj._website = websiteObj._id;
                        pageObj.save();
                        return websiteObj.save();
                    });
            },
            function (error) {
                console.log(error);
            });
    }
    function findPageById(pid) {
        return PageModel.findById(pid);
    }
    function updatePage(pageId, page) {
        return PageModel.update(
            {
            _id: pageId
        },
            {
                name: page.name,
                description: page.description
            }
        )
    }
    function deletePage(pid) {
        return PageModel
            .findById(pid)
            .then(function(pageObj)
            {
                model
                    .websiteModel
                    .findWebsiteById(pageObj._website)
                    .then(function (websiteObj) {
                        var pIndex = websiteObj.pages.indexOf(pid);
                        websiteObj.pages.splice(pIndex, 1);
                        return websiteObj.save();
                    });
                return PageModel
                    .remove({
                        _id: pid
                    });
            });
       /* model
            .websiteModel
            .update({
                    $pull:{pages: pid}
                },
                {
                    multi: true
                });*/
     /*   */
    }
};