module.exports = function(sequelize, DataTypes) {
    return sequelize.define("coursesInfo", {
        id: {
            type: DataTypes.DOUBLE,
            unique: true,
            allowNull: false, 
            autoIncrement: true, 
            primaryKey: true 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        desc: {
            type: DataTypes.STRING
        },
        period: { //学时
            type: DataTypes.INTEGER,
            allowNull: false
        },
        credit: { //学分
            type: DataTypes.INTEGER,
            allowNull: false
        },
        schoolTime: { //上课时间
            type: DataTypes.STRING,
            allowNull: false 
        },
        schoolAddress: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        examTime: { //考试时间
            type: DataTypes.STRING
        },
        examAddress: {
            type: DataTypes.STRING
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        majorId: {
            type: DataTypes.DOUBLE
        },
        majorName: {
            type: DataTypes.STRING
        }
    }, {
        underscored: true, //额外字段以下划线来分割
        timestamps: false, //取消默认生成的createdAt、updatedAt字段
        freezeTableName: true, // Model 对应的表名将与model名相同
        createdAt: "created_at",
        updatedAt: "updated_at",
        classMethods: classMethods,
        comment: "课程信息存储类"
    });
}

const classMethods = {

}