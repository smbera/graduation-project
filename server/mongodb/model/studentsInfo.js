var mongoose = require("mongoose");
var studentsInfoSchema = require("../schema/studentsInfo.js");

var studentsInfoModel = mongoose.model("studentsInfo", studentsInfoSchema);

module.exports = studentsInfoModel;
