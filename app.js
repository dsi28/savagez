require('dotenv').config()
const createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  Sequelize = require('sequelize'),
  LocalStrategy = require('passport-local').Strategy,
  //auth
  passport = require('passport'),
  session = require('express-session'),

  //routes
  indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users'),
  jobsRouter = require('./routes/jobs'),

  app = express();

  //models
  const { User, Job } = require('./sequelize');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//express session config
app.use(require('express-session')({
	secret:process.env.EXPRESS_SESSION,
	resave: false,
	saveUninitialized: false
}))

//passport set up
app.use(passport.initialize());
app.use(passport.session());
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/caves/:id/jobs', jobsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
