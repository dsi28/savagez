const Sequelize = require('sequelize'),
    //models
    UserModel = require('./models/User'),
    JobModel = require('./models/Job'),
    //db connection
    sequelize = new Sequelize('savagez', 'postgres', 'JKG!@#45', {
        host: 'localhost',
        dialect: 'postgres'
    }),
    //Create instances of the models
    User = UserModel(sequelize,Sequelize),
    Job = JobModel(sequelize,Sequelize);

Job.belongsTo(User);
sequelize.sync()//creates tables if they have not been created.({force: true} as a param will clear all tables)
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = {
    User,
    Job
}