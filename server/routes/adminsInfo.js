var express = require('express');
var router = express.Router();

var { sequelize, Sequelize } = require("../config/db");

var adminsInfo = sequelize.import("../models/adminsInfo");
var studentsInfo = sequelize.import("../models/studentsInfo");
var teachersInfo = sequelize.import("../models/teachersInfo");
var studentsCourses = sequelize.import("../models/studentsCourses");
var studentsTeachers = sequelize.import("../models/studentsTeachers");

function addInfo(req, res, next, obj) {
    adminsInfo.findOne({
        where: {
            id: req.body.adminId,
            password: req.body.adminPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: 001,
                msg: '无权限增加用户'
            })
        } else {
            obj.create(req.body).then(function(result) {
                if(result == null) {
                    res.json({
                        status: 1,
                        msg: '增加用户失败'
                    })
                } else {
                    res.json({
                        status: 1,
                        msg: '增加用户成功'
                    })
                }
            })
        }
    }).catch(next);
}

function updateInfo(req, res, next, obj) {
    adminsInfo.findOne({
        where: {
            id: req.body.adminId,
            password: req.body.adminPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: 001,
                msg: '无权限更新用户'
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

function deleteInfo(req, res, next, obj) {
    adminsInfo.findOne({
        where: {
            id: req.body.adminId,
            password: req.body.adminPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: 001,
                msg: '无权限删除用户'
            })
        } else {
            obj.destroy({
                where: {
                    id: req.body.id
                }
            }).then(function(result) {
                if(result == 0) {
                    res.json({
                        status: 1,
                        msg: '删除用户失败'
                    })
                } else {
                    res.json({
                        status: 1,
                        msg: '删除用户成功'
                    })
                }
            })
        }
    }).catch(next);
}

function open(req, res, next, obj) {
    adminsInfo.findOne({
        where: {
            id: req.body.adminId,
            password: req.body.adminPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: 001,
                msg: '无权限开启'
            })
        } else {
            studentsInfo.findAll({
                attributes: ['id'],
                where: {
                    grade: req.body.grade
                }
            }).then(function(result) {
                if(result.length == 0) {
                    res.json({
                        status: 1,
                        msg: '开启失败,没找到对应的年级'
                    })
                } else {
                    var tempArr = [];
                    result.forEach(function(item) {
                        tempArr.push(item.id)
                    })

                    obj.update({
                       isOpen: req.body.isOpen 
                    }, {
                        where: {
                            students_info_id: {
                                [Sequelize.Op.in]: tempArr
                            }
                        }
                    }).then(function(result) {
                        if(result[0] == 0) {
                            res.json({
                                status: 1,
                                msg: '开启失败'
                            })
                        } else {
                            res.json({
                                status: 1,
                                msg: '开启成功'
                            })
                        }
                    })
                }
            })
        }
    }).catch(next);
}

router.post("/addStudentsInfo", function(req, res, next) {
    addInfo(req, res, next, studentsInfo)
});

router.post("/updateStudentsInfo", function(req, res, next) {
    updateInfo(req, res, next, studentsInfo)
});

router.post("/deleteStudentsInfo", function(req, res, next) {
    deleteInfo(req, res, next, studentsInfo)
});

router.post("/addTeachersInfo", function(req, res, next) {
    addInfo(req, res, next, teachersInfo)
});

router.post("/updateTeachersInfo", function(req, res, next) {
    updateInfo(req, res, next, teachersInfo)
});

router.post("/deleteTeachersInfo", function(req, res, next) {
    deleteInfo(req, res, next, teachersInfo)
});

router.post("/openCoursesSelect", function(req, res, next) {
    open(req, res, next, studentsCourses)
})

router.post("/openTeachersAssessment", function(req, res, next) {
    open(req, res, next, studentsTeachers)
});

module.exports = router;
