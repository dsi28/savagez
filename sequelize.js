const Sequelize = require('sequelize'),
    //models
    UserModel = require('./models/User'),
    JobModel = require('./models/Job'),
    RoleModel = require('./models/Role'),
    CaveModel = require('./models/Cave'),
    RequestModel = require('./models/Request'),
    //db connection
    sequelize = new Sequelize(process.env.POSTGRE_DB),
    //Create instances of the models
    User = UserModel(sequelize,Sequelize),
    Job = JobModel(sequelize,Sequelize),
    Role = RoleModel(sequelize,Sequelize),
    Request = RequestModel(sequelize,Sequelize),
    Cave = CaveModel(sequelize,Sequelize),
    CaveUser = sequelize.define('CaveUser', {});

//Set all relationships
//user-cave many to many using CaveUser. CaveUser-role one to one. user-job one to many. cave-job one to many. 
    //jobs one to one user
Job.belongsTo(User, {foreignKey: 'username'});
Job.belongsTo(Cave, {foreignKey: 'caveId', onDelete: 'cascade', hooks: true});

    // cave-request one to many 
Cave.hasMany(Request, {foreignKey: 'caveId', onDelete: 'cascade', hooks: true});
    // user-requrest one to many
User.hasMany(Request, {foreignKey: 'username'});

    //cave-user relationship. many to many
User.belongsToMany(Cave, { through: CaveUser, unique: false, foreignKey: 'username' });
Cave.belongsToMany(User, { through: CaveUser, unique: false, foreignKey: 'caveId' });

Role.hasOne(CaveUser, { foreignKey: 'role'});


sequelize.sync({})//creates tables if they have not been created.({force: true} as a param will clear all tables)
  .then(() => {
    console.log(`Database & tables created!`);
  });

  // //create roles to
  // Role.create({
  //   name: 'Land Lord',
  //   desc:'admin'
  // });
  // Role.create({
  //   name: 'Savage',
  //   desc:'user'
  // });
module.exports = {
  User,
  Job,
  Role,
  Request,
  Cave,
  CaveUser
}