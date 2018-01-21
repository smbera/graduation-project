var mongoose = require('mongoose');

var teachersInfoSchema = new mongoose.Schema({
	userName: String,
	password: String
});

module.exports = teachersInfoSchema;
