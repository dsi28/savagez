const bcrypt = require('bcrypt');

module.exports = function(sequelize,DataTypes) {
    const User = sequelize.define('User', {
        username:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        password:{
            type: DataTypes.STRING,
            AllowNull:false
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

    User.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    }

    User.addHook('beforeCreate', function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    });

    return User;
};