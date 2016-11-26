module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        _website:{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
        name: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'WidgetModel'}],
        dateCreated: Date
    },{collection: "page"});
    return PageSchema;
};