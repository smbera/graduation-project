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
	                code: 001,
	                msg: '用户名或密码错误，无权限更新信息，请重新登录后再操作'
	            })
	        } else {
	        	obj.update(req.body, {
	                where: {
	                    id: req.body.id
	                }
	            }).then(function(result) {
	                if(result[0] == 0) {
	                    res.json({
	                        status: 1,
	                        msg: '更新用户失败'
	                    })
	                } else {
	                    res.json({
	                        status: 1,
	                        msg: '更新用户成功'
	                    })
	                }
	            })
	        }
	    }).catch(next);
	}
}

module.exports = common;
