var express = require('express');
var router = express.Router();

var { sequelize, Sequelize } = require("../config/db");

var studentsInfo = sequelize.import("../models/studentsInfo");
var teachersInfo = sequelize.import("../models/teachersInfo");
var coursesInfo = sequelize.import("../models/coursesInfo");

router.get("/:id", function(req, res, next) {
    studentsInfo.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: teachersInfo,
            attributes: { exclude: ['password', 'studentsTeachers'] }
        },{
            model: coursesInfo,
            attributes: { exclude: ['password'] }
        }]
    }).then(function(result) {
        res.json({
            status: 1,
            data: result
        });
    }).catch(next);
});

/**
 * 获取当前登录信息关联的用户信息
 */
// router.get("/:id/user", function(req, res, next) {
//     Role.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [User]
//     }).then(function(role) {
//         res.json({
//             status: 1,
//             data: role
//         });
//     }).catch(next);
// });

/**
 * 删除
 */
// router.get("/:id/del", function(req, res, next) {
//     Role.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(function(result) {
//         res.json({
//             status: 1,
//             data: result
//         });
//     }).catch(next);
// });

/**
 * 新增一个角色
 */
router.post("/", function(req, res, next) {
    studentsInfo.create(req.body).then(function(result) {
        res.json({
            status: 1,
            data: result
        })
    }).catch(next);
});

/**
 * 更新角色
 */
// router.post("/:id/update", function(req, res, next) {
//     Role.update(req.body, {
//         where: {
//             id: req.params.id
//         }
//     }).then(function(role) {
//         res.json({
//             status: 1,
//             data: role
//         })
//     }).catch(next);
// });

module.exports = router;