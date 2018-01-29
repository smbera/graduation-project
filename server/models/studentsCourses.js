module.exports = function(sequelize, DataTypes) {
    return sequelize.define("studentsCourses", {
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
        isOpen: {
            type: DataTypes.STRING
        }
    }, {
        underscored: true, //额外字段以下划线来分割
        timestamps: false, //取消默认生成的createdAt、updatedAt字段
        freezeTableName: true, // Model 对应的表名将与model名相同
        createdAt: "created_at",
        updatedAt: "updated_at",
        classMethods: classMethods,
        comment: "学生课程信息存储类"
    });
}

const classMethods = {

}