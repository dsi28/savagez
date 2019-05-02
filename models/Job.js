module.exports = (sequelize, DataTypes)=> {
    return sequelize.define('Job', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: { //TABLE ROW
           type: DataTypes.STRING, //EXPECTING A STRING {COLUMN STRUCTURE}
           AllowNull: false //THIS COLUMN CANNOT BE EMPTY
        },
        status: { //TABLE ROW
            type: DataTypes.STRING, //EXPECTING A STRING {COLUMN STRUCTURE}
            AllowNull: false //THIS COLUMN CANNOT BE EMPTY
        }
    });
};