module.exports = function(sequelize,DataTypes){
    return sequelize.define('Role', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        desc:{
            type: DataTypes.STRING
        }
    });
}