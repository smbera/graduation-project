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
                code: code.NO_ACCESS_GET_SCORE_INFO,
                msg: msg.NO_ACCESS_GET_SCORE_INFO
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
                        code: code.NO_SCORE_INFO_FOR_NO_SELECT_COURSES,
                        msg: msg.NO_SCORE_INFO_FOR_NO_SELECT_COURSES
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
                            code: code.GET_SCORE_INFO_SUCC,
                            msg: msg.GET_SCORE_INFO_SUCC,
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
                code: code.NO_ACCESS_GET_EXAM_INFO,
                msg: msg.NO_ACCESS_GET_EXAM_INFO
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
                        code: code.NO_EXAM_INFO_FOR_NO_SELECT_COURSES,
                        msg: msg.NO_EXAM_INFO_FOR_NO_SELECT_COURSES
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
                                code: code.NO_EXAM_INFO,
                                msg: msg.NO_EXAM_INFO
                            })
                        } else {
                        	res.json({
                                code: code.GET_EXAM_INFO_SUCC,
                                msg: msg.GET_EXAM_INFO_SUCC,
                                data: tempArr
                            })
                        }
                    })
                }
            })
        }
    }).catch(next);
});

router.get("/getTeachersAssessmentInfo", function(req, res, next) {
    studentsInfo.findOne({
        where: {
            id: req.query.studentId,
            password: req.query.studentPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: code.NO_ACCESS_GET_TEACHERS_ASSESSMENT_INFO,
                msg: msg.NO_ACCESS_GET_TEACHERS_ASSESSMENT_INFO
            })
        } else {
            studentsTeachers.findAll({
                attributes: ['score', 'content', 'courseId', 'teachers_info_id'],
                where: {
                    students_info_id: req.query.studentId
                }
            }).then(function(result) {
                if(result.length == 0) {
                    res.json({
                        code: code.NO_TEACHERS_ASSESSMENT_INFO_FOR_NO_SELECT_COURSES,
                        msg: msg.NO_TEACHERS_ASSESSMENT_INFO_FOR_NO_SELECT_COURSES
                    })
                } else {
                    var tempCourseIdArr = [],
                        tempTeacherIdArr = [],
                        tempTeachersAssessmentInfo = [];
                    result.forEach(function(item) {
                        tempCourseIdArr.push(item.courseId)
                        tempTeacherIdArr.push(item.teachers_info_id)
                        tempTeachersAssessmentInfo.push({
                            score: item.score,
                            content: item.content,
                            teachers_info_id: item.teachers_info_id
                        })
                    })
                    coursesInfo.findAll({
                        attributes: ['id', 'name', 'period', 'credit'],
                        where: {
                            id: {
                                [Sequelize.Op.in]: tempCourseIdArr
                            }
                        }
                    }).then(function(result) {
                        var tempCourseInfo = result;

                        teachersInfo.findAll({
                            attributes: ['name', 'title'],
                            where: {
                                id: {
                                    [Sequelize.Op.in]: tempTeacherIdArr
                                }
                            }
                        }).then(function(result) {
                            for(var i = 0; i < tempTeachersAssessmentInfo.length; i++) {
                                tempTeachersAssessmentInfo[i].id = tempCourseInfo[i].id;
                                tempTeachersAssessmentInfo[i].name = tempCourseInfo[i].name;
                                tempTeachersAssessmentInfo[i].period = tempCourseInfo[i].period;
                                tempTeachersAssessmentInfo[i].credit = tempCourseInfo[i].credit;
                                tempTeachersAssessmentInfo[i].teacherName = result[i].name;
                                tempTeachersAssessmentInfo[i].teacherTitle = result[i].title;
                            }

                            res.json({
                                code: code.GET_TEACHERS_ASSESSMENT_INFO_SUCC,
                                msg: msg.GET_TEACHERS_ASSESSMENT_INFO_SUCC,
                                data: tempTeachersAssessmentInfo 
                            })
                        })
                    })
                }
            })
        }
    }).catch(next);
});

router.get("/getIsCanAddAssessment", function(req, res, next) {
    studentsInfo.findOne({
        where: {
            id: req.query.studentId,
            password: req.query.studentPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: code.NO_ACCESS_GET_TEACHERS_ASSESSMENT_INFO,
                msg: msg.NO_ACCESS_GET_TEACHERS_ASSESSMENT_INFO
            })
        } else {
            studentsTeachers.findOne({
                attributes: ['isOpen'],
                where: {
                    students_info_id: req.query.studentId
                }
            }).then(function(result) {
                if(result == null) {
                    res.json({
                        code: code.NO_TEACHERS_ASSESSMENT_INFO_FOR_NO_SELECT_COURSES,
                        msg: msg.NO_TEACHERS_ASSESSMENT_INFO_FOR_NO_SELECT_COURSES
                    })
                } else {
                    if(result.isOpen == 'false') {
                        res.json({
                            code: code.CAN_NOT_ADD_ASSESSMENT_INFO,
                            msg: msg.CAN_NOT_ADD_ASSESSMENT_INFO
                        })
                    } else if(result.isOpen == 'true') {
                        res.json({
                            code: code.CAN_ADD_ASSESSMENT_INFO,
                            msg: msg.CAN_ADD_ASSESSMENT_INFO
                        })
                    }
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
                code: code.NO_ACCESS_ADD_TEACHERS_ASSESSMENT_INFO,
                msg: msg.NO_ACCESS_ADD_TEACHERS_ASSESSMENT_INFO
            })
        } else {
        	studentsTeachers.update(req.body, {
                where: {
                    students_info_id: req.body.studentId,
                    teachers_info_id: req.body.teacherId,
                    courseId: req.body.course_id
                }
            }).then(function(result) {
                if(result[0] == 0) {
                    res.json({
                        code: code.ADD_TEACHERS_ASSESSMENT_INFO_FAILE,
                        msg: msg.ADD_TEACHERS_ASSESSMENT_INFO_FAILE
                    })
                } else {
                    res.json({
                        code: code.ADD_TEACHERS_ASSESSMENT_INFO_SUCC,
                        msg: msg.ADD_TEACHERS_ASSESSMENT_INFO_SUCC
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
                    coursesInfo.findOne({
                        attributes: ['teachers_info_id'],
                        where: {
                            id: req.body.courses_info_id
                        }
                    }).then(function(result) {
                        if(result == null) {
                            
                        } else {
                            var tempObj= {
                                isOpen: 'false',
                                courseId: req.body.courses_info_id,
                                students_info_id: req.body.studentId,
                                teachers_info_id: result.dataValues.teachers_info_id
                            }
                            studentsTeachers.create(tempObj).then(function(result) {
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
                    studentsTeachers.destroy({
                        where: {
                            courseId: req.body.courses_info_id
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
            })
        }
    }).catch(next);
});

module.exports = router;
