const { User } = require('../sequelize'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

//passport set up
passport.use(new LocalStrategy(
 function(username,password,done){
   console.log(username);
    User.findOne({
    where:{
        username:username
    }
}).then(function(dbUser){
      console.log(dbUser);
     if(!dbUser){
       return done(null,false,{
         message:'User name does not exsist'
       });
     }else if(!dbUser.validPassword(password)){
       return done(null, false, {
         message: 'Incorrect Password'
       });
     }
     return done(null, dbUser);
   })
 }
));
passport.serializeUser(function(user,cb){
  cb(null,user);
});
passport.deserializeUser(function(obj,cb){
  cb(null,obj);
});

module.exports = passport;