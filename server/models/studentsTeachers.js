module.exports = function(sequelize, DataTypes) {
    return sequelize.define("studentsTeachers", {
        id: {
            type: DataTypes.DOUBLE,
            unique: true,
            allowNull: false, 
            autoIncrement: true, 
            primaryKey: true 
        },
        score: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.STRING
        },
        isOpen: {
            type: DataTypes.STRING
        },
        courseId: {
            type: DataTypes.DOUBLE
        },
        students_info_id: {
            type: DataTypes.DOUBLE
        },
        teachers_info_id: {
            type: DataTypes.DOUBLE
        }
    }, {
        underscored: true, //额外字段以下划线来分割
        timestamps: false, //取消默认生成的createdAt、updatedAt字段
        freezeTableName: true, // Model 对应的表名将与model名相同
        createdAt: "created_at",
        updatedAt: "updated_at",
        classMethods: classMethods,
        comment: "学生教师信息存储类"
    });
}

const classMethods = {

}