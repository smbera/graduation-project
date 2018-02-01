/**
 * 模型关联类
 */
var { sequelize } = require("../config/db");
var adminsInfo = sequelize.import("./adminsInfo");
var studentsInfo = sequelize.import("./studentsInfo");
var teachersInfo = sequelize.import("./teachersInfo");
var coursesInfo = sequelize.import("./coursesInfo");
var studentsCourses = sequelize.import("./studentsCourses");
var studentsTeachers = sequelize.import("./studentsTeachers");

//建立模型之间关联关系
adminsInfo.hasMany(studentsInfo);
studentsInfo.belongsTo(adminsInfo); //studentsInfo想反查adminsInfo必须加这个，否则只能实现adminsInfo查询studentsInfo

adminsInfo.hasMany(teachersInfo);
teachersInfo.belongsTo(adminsInfo);

studentsInfo.belongsToMany(coursesInfo, {through: "studentsCourses"});
coursesInfo.belongsToMany(studentsInfo, {through: 'studentsCourses'});

// studentsInfo.belongsToMany(teachersInfo, {through: "studentsTeachers"});
// teachersInfo.belongsToMany(studentsInfo, {through: 'studentsTeachers'});

teachersInfo.hasMany(coursesInfo);
coursesInfo.belongsTo(teachersInfo);

//创建表
sequelize.sync({ force: false });
