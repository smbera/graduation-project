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

router.get("/getReleaseCoursesInfo", function(req, res, next) {
    teachersInfo.findOne({
        where: {
            id: req.query.teacherId,
            password: req.query.teacherPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: code.USER_NO_EXIST,
                msg: msg.USER_NO_EXIST
            })
        } else {
            coursesInfo.findAll({
                attributes: { exclude: ['teachers_info_id'] },
                where: {
                    teachers_info_id: req.query.teacherId
                }
            }).then(function(result) {
                if(result.length == 0) {
                    res.json({
                       code: code.NO_RELEASE_COURSES,
                        msg: msg.NO_RELEASE_COURSES
                    })
                } else {
                    res.json({
                        code: code.GET_INFO_SUCC,
                        msg: msg.GET_INFO_SUCC,
                        data: result
                    })
                }
            })
        }
    }).catch(next);
});

router.get("/getStudentsSelectCoursesInfo", function(req, res, next) {
    teachersInfo.findOne({
        where: {
            id: req.query.teacherId,
            password: req.query.teacherPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: code.USER_NO_EXIST,
                msg: msg.USER_NO_EXIST
            })
        } else {
            coursesInfo.findAll({
                attributes: ['id', 'name', 'grade', 'majorId', 'majorName'],
                where: {
                    teachers_info_id: req.query.teacherId
                },
                include: [{ 
                    model: studentsInfo, 
                    attributes: { exclude: ['password', 'admins_info_id'] } 
                }] 
            }).then(function(result) {
                if(result.length == 0) {
                    res.json({
                        code: code.NO_RELEASE_COURSES,
                        msg: msg.NO_RELEASE_COURSES
                    })
                } else {
                    var tempArr = [];
                    for(var i = 0; i < result.length; i++) {
                        if(result[i].studentsInfos.length != 0) {
                            for(var j = 0; j < result[i].studentsInfos.length; j++ ) {
                                tempArr.push({
                                    coursesid: result[i].id ,
                                    coursesname: result[i].name,
                                    coursesgrade: result[i].grade,
                                    coursesmajorId: result[i].majorId,
                                    coursesmajorName: result[i].majorName,
                                    studentId: result[i].studentsInfos[j].id,
                                    studentName: result[i].studentsInfos[j].name,
                                    studentGender: result[i].studentsInfos[j].gender,
                                    studentTel: result[i].studentsInfos[j].tel,
                                    studentGrade: result[i].studentsInfos[j].grade,
                                    studentClass: result[i].studentsInfos[j].class,
                                    studentMajorId: result[i].studentsInfos[j].majorId,
                                    studentMajorName: result[i].studentsInfos[j].majorName
                                })
                            }
                        } else {
                            tempArr.push({
                                coursesid: result[i].id ,
                                coursesname: result[i].name,
                                coursesgrade: result[i].grade,
                                coursesmajorId: result[i].majorId,
                                coursesmajorName: result[i].majorName,
                            })
                        }
                    }
                    res.json({
                        code: code.GET_INFO_SUCC,
                        msg: msg.GET_INFO_SUCC,
                        data: tempArr
                    })
                }
            })
        }
    }).catch(next);
});

router.get("/getStudentsScoreInfo", function(req, res, next) {
    teachersInfo.findOne({
        where: {
            id: req.query.teacherId,
            password: req.query.teacherPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: 001,
                msg: '用户不存在'
            })
        } else {
            coursesInfo.findAll({
                attributes: ['id', 'name', 'grade', 'majorId', 'majorName'],
                where: {
                    teachers_info_id: req.query.teacherId
                },
                include: [{ 
                    model: studentsInfo, 
                    attributes: { exclude: ['password', 'tel', 'admins_info_id'] } 
                }] 
            }).then(function(result) {
                if(result.length == 0) {
                    res.json({
                        code: 1,
                        msg: '你还没有发布任何课程'
                    })
                } else {
                	res.json({
                        code: 1,
                        data: result
                    })
                }
            })
        }
    }).catch(next);
});

router.post("/updateStudentsScoreInfo", function(req, res, next) {
    teachersInfo.findOne({
        where: {
            id: req.body.teacherId,
            password: req.body.teacherPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: 001,
                msg: '用户不存在'
            })
        } else {
            var updateStudentsScoreInfoArr = eval(req.body.updateStudentsScoreInfo);
            updateStudentsScoreInfoArr.forEach(function(item){
                studentsCourses.update({
                    score: item.score
                }, {
                    where: {
                        courses_info_id: item.courseId,
                        students_info_id: item.studentId
                    }
                })
            })
            res.json({
                status: 1,
                msg: 'updateStudentsScoreInfoArr success'
            })
        }
    }).catch(next);
});

router.get("/getExamsInfo", function(req, res, next) {
    teachersInfo.findOne({
        where: {
            id: req.query.teacherId,
            password: req.query.teacherPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: 001,
                msg: '用户不存在'
            })
        } else {
            coursesInfo.findAll({
                attributes: ['id', 'name', 'examTime', 'examAddress'],
                where: {
                    teachers_info_id: req.query.teacherId
                }
            }).then(function(result) {
                if(result.length == 0) {
                    res.json({
                        code: 001,
                        msg: '你还未发布任何课程'
                    })
                } else {
                    res.json({
                        code: 1,
                        data: result
                    })
                }
            })
        }
    }).catch(next);
});

router.post("/updateExamsInfo", function(req, res, next) {
    teachersInfo.findOne({
        where: {
            id: req.body.teacherId,
            password: req.body.teacherPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: 001,
                msg: '用户不存在'
            })
        } else {
            var updateExamsInfoArr = eval(req.body.updateExamsInfo);
            updateExamsInfoArr.forEach(function(item){
                coursesInfo.update(item, {
                    where: {
                        id: item.id
                    }
                })
            })
            res.json({
                status: 1,
                msg: '更新用户成功'
            })
        }
    }).catch(next);
});

router.post("/signIn", function(req, res, next) {
	common.signIn(req, res, next, teachersInfo)
});

router.post("/updateInfo", function(req, res, next) {
    common.updateInfo(req, res, next, teachersInfo)
});

router.post("/addCourses", function(req, res, next) {
    teachersInfo.findOne({
        where: {
            id: req.body.teachers_info_id,
            password: req.body.teacherPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: code.USER_NO_EXIST,
                msg: msg.USER_NO_EXIST
            })
        } else {
            coursesInfo.create(req.body).then(function(result) {
                if(result == null) {
                    res.json({
                        code: code.RELEASE_COURSES_FAILE,
                        msg: msg.RELEASE_COURSES_FAILE
                    })
                } else {
                    res.json({
                        code: code.RELEASE_COURSES_SUCC,
                        msg: msg.RELEASE_COURSES_SUCC,
                        data: result
                    })
                }
            });
        }
    }).catch(next);
});

router.post("/deleteCourses", function(req, res, next) {
    teachersInfo.findOne({
        where: {
            id: req.body.teacherId,
            password: req.body.teacherPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: code.USER_NO_EXIST,
                msg: msg.USER_NO_EXIST
            })
        } else {
            Promise.all([
                coursesInfo.destroy({
                    where: {
                        id: req.body.courseId
                    }
                }),
                studentsCourses.destroy({
                    where: {
                        courses_info_id: req.body.courseId
                    }
                }),
                studentsTeachers.destroy({
                    where: {
                        courseId: req.body.courseId
                    }
                })
            ]).then(function(result) {
                if(result == 0) {
                    res.json({
                        code: code.DELETE_RELEASE_COURSES_FAILE,
                        msg: msg.DELETE_RELEASE_COURSES_FAILE
                    });
                } else {
                    res.json({
                        code: code.DELETE_RELEASE_COURSES_SUCC,
                        msg: msg.DELETE_RELEASE_COURSES_SUCC
                    });
                }
            })
        }
    }).catch(next);
});

module.exports = router;
