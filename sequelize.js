const Sequelize = require('sequelize'),
    //models
    UserModel = require('./models/User'),
    JobModel = require('./models/Job'),
    RoleModel = require('./models/Role'),
    CaveModel = require('./models/Cave'),
    //db connection
    sequelize = new Sequelize(process.env.POSTGRE_DB, process.env.POSTGRE_USER, process.env.POSTGRE_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres'
    }),
    //Create instances of the models
    User = UserModel(sequelize,Sequelize),
    Job = JobModel(sequelize,Sequelize),
    Role = RoleModel(sequelize,Sequelize),
    Cave = CaveModel(sequelize,Sequelize),
    CaveUser = sequelize.define('CaveUser', {});

//Set all relationships
    //jobs one to one user
Job.belongsTo(User,{foreignKey: 'userId' });
Job.belongsTo(Cave, {foreignKey: 'caveId' });
//User.hasMany(Job, {foreignKey:'wah'});

    //roles
//Role.hasMany(User, {foreignKey: 'role'});

    //Cave
// User.hasMany(Cave, {foreignKey: 'savage'});
//User.hasOne(Cave, {foreignKey: 'landLord'}); 
//Cave.hasMany(User, {foreignKey: 'caveId'}); // want the table id on the user table

    //cave-user relationship. many to many
User.belongsToMany(Cave, { through: CaveUser, unique: false, foreignKey: 'caveId' });
Cave.belongsToMany(User, { through: CaveUser, unique: false, foreignKey: 'userId' });

Role.hasOne(CaveUser, { foreignKey: 'role'});


sequelize.sync({force:true})//creates tables if they have not been created.({force: true} as a param will clear all tables)
  .then(() => {
    console.log(`Database & tables created!`);
  });

  //create roles to
  Role.create({
    name: 'Land Lord',
    desc:'admin'
  });
  Role.create({
    name: 'Savage',
    desc:'user'
  });
module.exports = {
  User,
  Job,
  Role,
  Cave
}