module.exports = function(sequelize, DataTypes) {
    return sequelize.define("teachersInfo", {
        id: {
            type: DataTypes.DOUBLE,
            unique: true,
            allowNull: false, 
            autoIncrement: true, 
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        tel: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        title: { //职称
            type: DataTypes.STRING,
            allowNull: false
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true, //额外字段以下划线来分割
        timestamps: false, //取消默认生成的createdAt、updatedAt字段
        freezeTableName: true, // Model 对应的表名将与model名相同
        createdAt: "created_at",
        updatedAt: "updated_at",
        classMethods: classMethods,
        comment: "教师信息存储类"
    });
}

const classMethods = {

}