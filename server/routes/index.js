var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var studentsModel = require("../mongodb/model/studentsInfo.js");
var teachersModel = require("../mongodb/model/teachersInfo.js");
var code = require("../status/code.js");
var msg = require("../status/msg.js");

var urlencoded = bodyParser.urlencoded({ extended: false })
app.use(urlencoded);

router.post('/login', urlencoded, function(req, res) {
 //  	listModel.find({},function(err, data){
	// 	res.send(data);
	// })
	// 
	//
	res.header("Access-Control-Allow-Origin", "*");
	res.type('application/json');

	function checkUserInfo(model) {
		model.find({
			userName: req.body.userName,
			password: req.body.password
		},function(err, data){
			if(err){
				res.send({
					code: code.LOGIN_FAILE,
					msg: msg.SERVER_ERROR
				})
			} else {
				if(data.length !==0 ) {
					res.send({
						code: code.LOGIN_SUCC,
						msg: msg.LOGIN_SUCC
					})
				} else {
					res.send({
						code: code.LOGIN_FAILE,
						msg: msg.LOGIN_FAILE
					})
				}
			}
		})
	}

	if(req.body.identity === '1'){
		checkUserInfo(studentsModel)
	} else if(req.body.identity === '2') {
		checkUserInfo(teachersModel)
	}

	// studentsModel.create({
	// 	userName: 'a1',
	// 	password: 'a1'
	// }, function(){
	// 	console.log("studentsModelsucc")
	// })

	// teachersModel.create({
	// 	userName: 'a2',
	// 	password: 'a2'
	// }, function(){
	// 	console.log("teachersModelsucc")
	// })

	// res.send('data');
});

module.exports = router;
