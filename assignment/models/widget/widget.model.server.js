module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        setModel: setModel,
        findAllWidgetsForPage: findAllWidgetsForPage,
        createWidget: createWidget,
        updateWidget: updateWidget,
        uploadImage: uploadImage,
        findWidgetById: findWidgetById,
        deleteWidget: deleteWidget
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findAllWidgetsForPage(pid) {
        return model.pageModel.findAllWidgetsForPage(pid);
    }

    function createWidget(pid, widget) {
        return WidgetModel
            .create(widget)
            .then(function (widgetObj) {
                return model
                    .pageModel
                    .findPageById(pid)
                    .then(function (pageObj) {
                        pageObj.widgets.push(widgetObj);
                        pageObj.save();
                        return widgetObj;
                    });
            });
    }

    function findWidgetById(wid) {
        return WidgetModel
            .findById(wid);
    }

    function uploadImage(widgetId, req) {
        var userId      = req.body.userId;
        var websiteId      = req.body.websiteId;
        var pageId      = req.body.pageId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        return WidgetModel
            .update(
                {
                    _id: widgetId
                },
                {
                    url: "/uploads/"+ filename
                }
            );
    }

    function updateWidget(wid, widget) {
        switch (widget.type) {
            case"HEADING":
                return WidgetModel.update(
                    {
                        _id: wid
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        size: widget.size
                    });
            case"YOUTUBE":
                return WidgetModel.update(
                    {
                        _id: wid
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width
                    });
            case"IMAGE":
                return WidgetModel.update(
                    {
                        _id: wid
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        url: widget.url,
                        width: widget.width
                    });
            case"HTML":
                return WidgetModel.update(
                    {
                        _id: wid
                    },
                    {
                        name: widget.name,
                        text: widget.text
                    });
            case"INPUT":
                return WidgetModel.update(
                    {
                        _id: wid
                    },
                    {
                        name: widget.name,
                        text: widget.text,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted
                    });
        }
    }
    function deleteWidget(widgetId) {
        return WidgetModel
            .remove({
                _id: widgetId
            });
    }
};