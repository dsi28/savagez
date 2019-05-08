const bcrypt = require('bcrypt');

module.exports = function(sequelize,DataTypes) {
    const User = sequelize.define('User', {
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
        },
        username:{
            type: DataTypes.STRING,
            AllowNull: false,
            unique: true
        },
        password:{
        type: DataTypes.STRING,
        AllowNull:false
        }
    });

    User.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    }

    User.addHook('beforeCreate', function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    })

    return User;
};