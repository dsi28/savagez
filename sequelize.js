const Sequelize = require('sequelize'),
    //models
    UserModel = require('./models/User'),
    JobModel = require('./models/Job'),
    RoleModel = require('./models/Role'),
    HouseGroupModel = require('./models/HouseGroup'),
    //db connection
    sequelize = new Sequelize('savagez', 'postgres', 'JKG!@#45', {
        host: 'localhost',
        dialect: 'postgres'
    }),
    //Create instances of the models
    User = UserModel(sequelize,Sequelize),
    Job = JobModel(sequelize,Sequelize),
    Role = RoleModel(sequelize,Sequelize),
    HouseGroup = HouseGroupModel(sequelize,Sequelize);

//Set all relationships
    //jobs one to one user
Job.belongsTo(User);
//User.hasMany(Job, {foreignKey:'wah'});

    //roles
Role.hasMany(User, {foreignKey: 'role'});

    //houseGroup
User.hasMany(HouseGroup, {foreignKey: 'savage'});
User.hasOne(HouseGroup, {foreignKey: 'landLord'})


sequelize.sync({force:true})//creates tables if they have not been created.({force: true} as a param will clear all tables)
  .then(() => {
    console.log(`Database & tables created!`);
  });

module.exports = {
  User,
  Job,
  Role,
  HouseGroup
}