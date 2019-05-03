module.exports = function(sequelize,DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: { //TABLE ROW
           type: DataTypes.STRING, //EXPECTING A STRING {COLUMN STRUCTURE}
           AllowNull: false //THIS COLUMN CANNOT BE EMPTY
        },
        lastName: { //TABLE ROW
            type: DataTypes.STRING, //EXPECTING A STRING {COLUMN STRUCTURE}
            AllowNull: false //THIS COLUMN CANNOT BE EMPTY
        }
    });
};