module.exports = function(sequelize,DataTypes){
    return sequelize.define('Cave',{
        caveId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { //TABLE ROW
           type: DataTypes.STRING, //EXPECTING A STRING {COLUMN STRUCTURE}
           AllowNull: false //THIS COLUMN CANNOT BE EMPTY
        }
    });
}