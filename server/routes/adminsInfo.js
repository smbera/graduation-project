var express = require('express');
var router = express.Router();

var { sequelize, Sequelize } = require("../config/db");
var common = require("./common.js");
var code = require("../status/code.js");
var msg = require("../status/msg.js");

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
                code: code.NO_ACCESS_ADD_USER,
                msg: msg.NO_ACCESS_ADD_USER
            })
        } else {
            obj.create(req.body).then(function(result) {
                if(result == null) {
                    res.json({
                        code: code.ADD_USER_FAILE,
                        msg: msg.ADD_USER_FAILE
                    })
                } else {
                    res.json({
                        code: code.ADD_USER_SUCC,
                        msg: msg.ADD_USER_SUCC,
                        data: result
                    })
                }
            })
        }
    }).catch(next);
}


function getInfo(req, res, next, obj) {
    adminsInfo.findOne({
        where: {
            id: req.query.adminId,
            password: req.query.adminPsw
        }
    }).then(function(result) {
        if(result == null) {
            res.json({
                code: code.NO_ACCESS_GET_USER,
                msg: msg.NO_ACCESS_GET_USER
            })
        } else {
            obj.findAll({
                attributes: { exclude: ['admins_info_id'] },
                where: {
                    admins_info_id: req.query.adminId
                }
            }).then(function(result) {
                if(result.length == 0) {
                    res.json({
                        code: code.GET_USER_FAILE,
                        msg: msg.GET_USER_FAILE
                    })
                } else {
                    res.json({
                        code: code.GET_USER_SUCC,
                        msg: msg.GET_USER_SUCC,
                        data: result
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
                code: code.NO_ACCESS_UPDATE_USER,
                msg: msg.NO_ACCESS_UPDATE_USER
            })
        } else {
            obj.update(req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(result) {
                if(result[0] == 0) {
                    res.json({
                        code: code.UPDATE_USER_FAILE,
                        msg: msg.UPDATE_USER_FAILE
                    })
                } else {
                    res.json({
                        code: code.UPDATE_USER_SUCC,
                        msg: msg.UPDATE_USER_SUCC
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
                code: code.NO_ACCESS_DELETE_USER,
                msg: msg.NO_ACCESS_DELETE_USER
            })
        } else {
            obj.destroy({
                where: {
                    id: req.body.id
                }
            }).then(function(result) {
                if(result == 0) {
                    res.json({
                        code: code.DELETE_USER_FAILE,
                        msg: msg.DELETE_USER_FAILE
                    })
                } else {
                    res.json({
                        code: code.DELETE_USER_SUCC,
                        msg: msg.DELETE_USER_SUCC
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
                code: code.NO_ACCESS_OPERATE,
                msg: msg.NO_ACCESS_OPERATE
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
                        code: code.OPERATE_FAILE_FOR_NO_GRADE,
                        msg: msg.OPERATE_FAILE_FOR_NO_GRADE
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
                                code: code.OPERATE_FAILE,
                                msg: msg.OPERATE_FAILE
                            })
                        } else {
                            res.json({
                                code: code.OPERATE_SUCC,
                                msg: msg.OPERATE_SUCC
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

router.post("/signIn", function(req, res, next) {
    common.signIn(req, res, next, adminsInfo)
});

router.post("/updateInfo", function(req, res, next) {
    common.updateInfo(req, res, next, adminsInfo)
});

router.get("/getStudentsInfo", function(req, res, next) {
    getInfo(req, res, next, studentsInfo)
});

router.get("/getTeachersInfo", function(req, res, next) {
    getInfo(req, res, next, teachersInfo)
});

module.exports = router;
