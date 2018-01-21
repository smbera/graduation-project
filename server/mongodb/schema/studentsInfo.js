var mongoose = require('mongoose');

var studentsInfoSchema = new mongoose.Schema({
	userName: String,
	password: String
});

module.exports = studentsInfoSchema;
