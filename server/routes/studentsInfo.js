var express = require('express');
var router = express.Router();

var { sequelize, Sequelize } = require("../config/db");
var common = require("./common.js");
var code = require("../status/code.js");
var msg = require("../status/msg.js");

var adminsInfo = sequelize.import("../models/adminsInfo");
var studentsInfo = sequelize.import("../models/studentsInfo");
var teachersInfo = sequelize.import("../models/teachersInfo");
var coursesInfo = sequelize.import("../models/coursesInfo");
var studentsCourses = sequelize.import("../models/studentsCourses");
var studentsTeachers = sequelize.import("../models/studentsTeachers");

router.get("/getAllCoursesInfo", function(req, res, next) {
    studentsInfo.findOne({
    	attributes: ['grade', 'majorId'],
        where: {
            id: req.query.studentId,
            password: req.query.studentPsw
        }
    }).then(function(result) {
        coursesInfo.findAll({
            attributes: { exclude: ['examTime', 'examAddress'] },
            where: {
                grade: result.grade,
                majorId: result.majorId
            }
        }).then(function(result) {
            if(result.length == 0) {
                res.json({
                    code: code.NO_COURSE_CAN_SELECT,
                    msg: msg.NO_COURSE_CAN_SELECT
                })
            } else {
            	var coursesInfoArr = result,
            		teachersInfoIdArr = [];
            	coursesInfoArr.forEach(function(item) {
            		teachersInfoIdArr.push(item.teachers_info_id);
            	})

            	teachersInfo.findAll({
	                attributes: ['id', 'name', 'gender'],
	                where: {
	                    id: {
                            [Sequelize.Op.in]: teachersInfoIdArr
                        }
	                }
	            }).then(function(result) {
	            	for(var i = 0; i < coursesInfoArr.length; i++) {
	            		for(var j = 0; j < result.length; j++) {
	            			if(coursesInfoArr[i].dataValues.teachers_info_id == result[j].id) {
	            				coursesInfoArr[i].dataValues.teachersName =  result[j].name;
	            				coursesInfoArr[i].dataValues.teachersGender =  result[j].gender;

	            				delete coursesInfoArr[i].dataValues.teachers_info_id;
	            			}
	            		}
	            	}
                    studentsCourses.findAll({
                        attributes: ['courses_info_id'],
                        where: {
                            students_info_id: req.query.studentId
                        }
                    }).then(function(result) {
                        for(var i = 0; i < coursesInfoArr.length; i++) {
                            for(var j = 0; j < result.length; j++) {
                                if(coursesInfoArr[i].dataValues.id == result[j].courses_info_id) {
                                    coursesInfoArr[i].dataValues.selected =  true;
                                    break;
                                } else {
                                    coursesInfoArr[i].dataValues.selected =  false;
                                }
                            }
                        }
                        res.json({
                            code: code.GET_CAN_SELECT_SUCC,
                            msg: msg.GET_CAN_SELECT_SUCC,
                            data: coursesInfoArr 
                        })
                    })
	            })
            }
        })
    }).catch(next);
});

router.get("/getSelectCoursesInfo", function(req, res, next) {
    studentsInfo.findOne({
        where: {
            id: req.query.studentId,
            password: req.query.studentPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: code.LOGIN_FAILE,
                msg: msg.LOGIN_FAILE
            })
        } else {
            studentsCourses.findAll({
                attributes: ['courses_info_id'],
                where: {
                    students_info_id: req.query.studentId
                }
            }).then(function(result) {
                if(result.length == 0) {
                    res.json({
                        code: code.NO_COURSE_CAN_SELECT,
                        msg: msg.NO_COURSE_CAN_SELECT
                    })
                } else {
                	var coursesInfoIdArr = [];
                    result.forEach(function(item) {
                        coursesInfoIdArr.push(item.courses_info_id)
                    })

                    coursesInfo.findAll({
		                attributes: ['teachers_info_id'],
		                where: {
		                    id: {
                                [Sequelize.Op.in]: coursesInfoIdArr
                            }
		                }
		            }).then(function(result) {
						var teachersInfoIdArr = [];
	                    result.forEach(function(item) {
	                        teachersInfoIdArr.push(item.teachers_info_id)
	                    })

	                    teachersInfo.findAll({
			                attributes: ['id', 'name', 'gender'],
			                where: {
			                    id: {
	                                [Sequelize.Op.in]: teachersInfoIdArr
	                            }
			                }
			            }).then(function(result) {
		              		var teachersInfoArr = result;

			              	coursesInfo.findAll({
				                attributes: ['id', 'name', 'desc', 'period', 'credit', 'schoolTime', 'schoolAddress', 'teachers_info_id'],
				                where: {
				                    id: {
		                                [Sequelize.Op.in]: coursesInfoIdArr
		                            }
				                }
				            }).then(function(result) {
				            	for(var i = 0; i < result.length; i++) {
				            		for(var j = 0; j < teachersInfoArr.length; j++) {
				            			if(result[i].dataValues.teachers_info_id == teachersInfoArr[j].id) {
				            				result[i].dataValues.teachersName =  teachersInfoArr[j].name;
				            				result[i].dataValues.teachersGender =  teachersInfoArr[j].gender;

				            				delete result[i].dataValues.teachers_info_id;
				            			}
				            		}
				            	}

		                    	res.json({
		                            code: code.GET_CAN_SELECT_SUCC,
                                    msg: msg.GET_CAN_SELECT_SUCC,
		                            data: result
		                        })
		                    })
			            })
		            })
                }
            })
        }
    }).catch(next);
});

router.get("/getScoreInfo", function(req, res, next) {
    studentsInfo.findOne({
        where: {
            id: req.query.studentId,
            password: req.query.studentPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: 001,
                msg: '用户不存在'
            })
        } else {
            studentsCourses.findAll({
                attributes: ['score', 'courses_info_id'],
                where: {
                    students_info_id: req.query.studentId
                }
            }).then(function(result) {
                if(result.length == 0) {
                    res.json({
                        code: 1,
                        msg: '你还没有选择任何课程，所以无成绩查询'
                    })
                } else {
                	var coursesInfoArr = result,
                		tempArr = [];
                    coursesInfoArr.forEach(function(item) {
                        tempArr.push(item.courses_info_id)
                    })

                    coursesInfo.findAll({
		                attributes: ['id', 'name', 'period', 'credit'],
		                where: {
		                    id: {
                                [Sequelize.Op.in]: tempArr
                            }
		                }
		            }).then(function(result) {
		            	for(var i = 0; i < result.length; i++) {
		            		for(var j = 0; j < coursesInfoArr.length; j++) {
		            			if(result[i].dataValues.id == coursesInfoArr[j].courses_info_id) {
		            				result[i].dataValues.score =  coursesInfoArr[j].score;

		            				delete result[i].dataValues.id;
		            			}
		            		}
		            	}

                    	res.json({
                            code: 1,
                            data: result
                        })
                    })
                }
            })
        }
    }).catch(next);
});

router.get("/getExamsInfo", function(req, res, next) {
    studentsInfo.findOne({
        where: {
            id: req.query.studentId,
            password: req.query.studentPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: 001,
                msg: '用户不存在'
            })
        } else {
            studentsCourses.findAll({
                attributes: ['courses_info_id'],
                where: {
                    students_info_id: req.query.studentId
                }
            }).then(function(result) {
                if(result.length == 0) {
                    res.json({
                        code: 1,
                        msg: '你还没有选择任何课程，所以无考试安排'
                    })
                } else {
                    var tempArr = [];
                    result.forEach(function(item) {
                        tempArr.push(item.courses_info_id)
                    })

                    coursesInfo.findAll({
		                attributes: ['id', 'name', 'examTime', 'examAddress'],
		                where: {
		                    id: {
                                [Sequelize.Op.in]: tempArr
                            }
		                }
		            }).then(function(result) {
                        var tempArr = result.filter(function(item) {
                        	return item.examTime != ''||item.examAddress != ''
                        })

                        if(tempArr.length == 0) {
                        	res.json({
                                code: 1,
                                msg: '无考试安排'
                            })
                        } else {
                        	res.json({
                                code: 1,
                                data: tempArr
                            })
                        }
                    })
                }
            })
        }
    }).catch(next);
});

router.post("/signIn", function(req, res, next) {
    common.signIn(req, res, next, studentsInfo)
});

router.post("/updateInfo", function(req, res, next) {
    common.updateInfo(req, res, next, studentsInfo)
});

router.post("/addTeachersAssessment", function(req, res, next) {
    studentsInfo.findOne({
        where: {
            id: req.body.studentId,
            password: req.body.studentPsw
        }
    }).then(function(result) {
    	if(result == null) {
            res.json({
                code: 001,
                msg: '用户名或密码错误，无权限评教，请重新登录后再操作'
            })
        } else {
        	studentsTeachers.update(req.body, {
                where: {
                    students_info_id: req.body.studentId,
                    teachers_info_id: req.body.teacherId
                }
            }).then(function(result) {
                if(result[0] == 0) {
                    res.json({
                        status: 1,
                        msg: '评教失败'
                    })
                } else {
                    res.json({
                        status: 1,
                        msg: '评教成功'
                    })
                }
            })
        }
    }).catch(next);
});

router.post("/selectedCourseInfo", function(req, res, next) {
    studentsInfo.findOne({
        where: {
            id: req.body.studentId,
            password: req.body.studentPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: code.NO_ACCESS_SELECT_COURSE,
                msg: msg.NO_ACCESS_SELECT_COURSE
            })
        } else {
            studentsCourses.create(req.body).then(function(result) {
                if(result == null) {
                    res.json({
                        code: code.SELECT_COURSE_FAILE,
                        msg: msg.SELECT_COURSE_FAILE
                    })
                } else {
                    res.json({
                        code: code.SELECT_COURSE_SUCC,
                        msg: msg.SELECT_COURSE_SUCC
                    })
                }
            })
        }
    }).catch(next);
});

router.post("/deleteSelectedCourseInfo", function(req, res, next) {
    studentsInfo.findOne({
        where: {
            id: req.body.studentId,
            password: req.body.studentPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: code.NO_ACCESS_DELETE_SELECT_COURSE,
                msg: msg.NO_ACCESS_DELETE_SELECT_COURSE
            })
        } else {
            studentsCourses.destroy({
                where: {
                    students_info_id: req.body.studentId,
                    courses_info_id: req.body.courses_info_id
                }
            }).then(function(result) {
                if(result == 0) {
                    res.json({
                        code: code.DELETE_SELECT_COURSE_FAILE,
                        msg: msg.DELETE_SELECT_COURSE_FAILE
                    })
                } else {
                    res.json({
                        code: code.DELETE_SELECT_COURSE_SUCC,
                        msg: msg.DELETE_SELECT_COURSE_SUCC
                    })
                }
            })
        }
    }).catch(next);
});

module.exports = router;
