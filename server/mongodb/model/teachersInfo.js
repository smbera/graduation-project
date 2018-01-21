var mongoose = require("mongoose");
var teachersInfoSchema = require("../schema/teachersInfo.js");

var teachersInfoModel = mongoose.model("teachersInfo", teachersInfoSchema);

module.exports = teachersInfoModel;
