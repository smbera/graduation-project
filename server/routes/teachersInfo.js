var express = require('express');
var router = express.Router();

var { sequelize, Sequelize } = require("../config/db");
var common = require("./common.js");

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
                code: 001,
                msg: '用户不存在'
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

router.get("/getStudentsSelectCoursesInfo", function(req, res, next) {
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
                code: 001,
                msg: '用户不存在'
            })
        } else {
            coursesInfo.create(req.body).then(function(result) {
                res.json({
                    code: 001,
                    msg: 'addCourses success'
                });
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
                code: 001,
                msg: '用户不存在'
            })
        } else {
            coursesInfo.destroy({
                where: {
                    id: req.body.courseId
                }
            }).then(function(result) {
                if(result == 0) {
                    res.json({
                        status: 1,
                        data: 'deleteCourses faile'
                    });
                } else {
                    res.json({
                        status: 1,
                        data: 'deleteCourses success'
                    });
                }
            })
        }
    }).catch(next);
});

module.exports = router;
