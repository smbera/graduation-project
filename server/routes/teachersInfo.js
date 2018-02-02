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
                    attributes: { exclude: ['password', 'tel', 'admins_info_id'] } 
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
                                    studentGrade: result[i].studentsInfos[j].grade,
                                    studentClass: result[i].studentsInfos[j].class,
                                    studentMajorId: result[i].studentsInfos[j].majorId,
                                    studentMajorName: result[i].studentsInfos[j].majorName,
                                    studentScore: result[i].studentsInfos[j].studentsCourses.score,
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

router.post("/updateStudentsScoreInfo", function(req, res, next) {
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
            studentsCourses.update(req.body, {
                where: {
                    students_info_id: req.body.studentId,
                    courses_info_id: req.body.courseId
                }
            }).then(function(result) {
                if(result[0] == 0) {
                    res.json({
                        code: code.RELEASE_SCORE_INFO_FAILE,
                        msg: msg.RELEASE_SCORE_INFO_FAILE
                    })
                } else {
                    res.json({
                        code: code.RELEASE_SCORE_INFO_SUCC,
                        msg: msg.RELEASE_SCORE_INFO_SUCC
                    })
                }
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
                code: code.USER_NO_EXIST,
                msg: msg.USER_NO_EXIST
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

router.get("/getAssessmentInfo", function(req, res, next) {
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
            studentsTeachers.findAll({
                attributes: ['score', 'content', 'courseId'],
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
                    var tempArr = result;
                    var coursesIdArr = [];
                    result.forEach(function(item) {
                        coursesIdArr.push(item.courseId)
                    })

                    coursesInfo.findAll({
                        attributes: ['id', 'name'],
                        where: {
                            id: {
                                [Sequelize.Op.in]: coursesIdArr
                            }
                        }
                    }).then(function(result) {
                        for(var i = 0; i < tempArr.length; i++) {
                            for(var j = 0; j < result.length; j++) {
                                if(tempArr[i].courseId == result[j].id) {
                                    tempArr[i].dataValues.courseName = result[j].name
                                }
                            }
                        }
                        res.json({
                            code: code.GET_INFO_SUCC,
                            msg: msg.GET_INFO_SUCC,
                            data: tempArr
                        })
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
                code: code.USER_NO_EXIST,
                msg: mag.USER_NO_EXIST
            })
        } else {
            coursesInfo.update(req.body, {
                where: {
                    teachers_info_id: req.body.teacherId,
                    id: req.body.courseId
                }
            }).then(function(result) {
                if(result[0] == 0) {
                    res.json({
                        code: code.RELEASE_EXAM_INFO_FAILE,
                        msg: msg.RELEASE_EXAM_INFO_FAILE
                    })
                } else {
                    res.json({
                        code: code.RELEASE_EXAM_INFO_SUCC,
                        msg: msg.RELEASE_EXAM_INFO_SUCC
                    })
                }
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
