var code = require("../status/code.js");
var msg = require("../status/msg.js");

var common = {
	signIn(req, res, next, obj) {
		obj.findOne({
	        where: {
	            id: req.body.id,
	            password: req.body.psw
	        }
	    }).then(function(result) {
	    	if(result == null) {
	            res.json({
	                code: code.LOGIN_FAILE,
	                msg: msg.LOGIN_FAILE
	            })
	        } else {
	        	res.json({
	                code: code.LOGIN_SUCC,
	                msg: msg.LOGIN_SUCC
	            })
	        }
	    }).catch(next);
	},
	updateInfo(req, res, next, obj) {
		obj.findOne({
	        where: {
	            id: req.body.id,
	            password: req.body.psw
	        }
	    }).then(function(result) {
	    	if(result == null) {
	            res.json({
	                code: code.NO_ACCESS_UPDATE_INFO,
	                msg: msg.NO_ACCESS_UPDATE_INFO
	            })
	        } else {
	        	obj.update(req.body, {
	                where: {
	                    id: req.body.id
	                }
	            }).then(function(result) {
	                if(result[0] == 0) {
	                    res.json({
	                        code: code.UPDATE_INFO_FAILE,
	                		msg: msg.UPDATE_INFO_FAILE
	                    })
	                } else {
	                    res.json({
	                        code: code.UPDATE_INFO_SUCC,
	                		msg: msg.UPDATE_INFO_SUCC
	                    })
	                }
	            })
	        }
	    }).catch(next);
	}
}

module.exports = common;
