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
    Cave = CaveModel(sequelize,Sequelize);

//Set all relationships
    //jobs one to one user
Job.belongsTo(User);
//User.hasMany(Job, {foreignKey:'wah'});

    //roles
Role.hasMany(User, {foreignKey: 'role'});

    //Cave
// User.hasMany(Cave, {foreignKey: 'savage'});
//User.hasOne(Cave, {foreignKey: 'landLord'}); 
Cave.hasMany(User, {foreignKey: 'caveId'}); // want the table id on the user table

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
  Cave
}