module.exports = function () {
    var mongoose = require("mongoose");
    var types = ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'];
    var WidgetSchema = mongoose.Schema({
        //_user:{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
        type:{ type: String, enum: types },
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: String,
        size: String,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: Date
    },{collection: "widget"});
    return WidgetSchema;

};