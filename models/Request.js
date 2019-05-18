module.exports = function(sequelize,DataTypes){
    return sequelize.define('Request',{
        requestId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: { //TABLE column
           type: DataTypes.STRING, //EXPECTING A STRING {COLUMN STRUCTURE}
           AllowNull: false, //THIS COLUMN CANNOT BE EMPTY
           defaultValue: 'pending'
        }
    });
}