require('dotenv').config()
const createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  methodOverride = require('method-override'),
  flash = require('connect-flash'),
  engine = require('ejs-mate'),
  //auth
  passport = require('./middleware/passport'),
  //routes
  indexRouter = require('./routes/index'),
  usersRouter = require('./routes/users'),
  jobsRouter = require('./routes/jobs'),
  cavesRouter = require('./routes/caves'),
  requestRouter = require('./routes/requests'),

  app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', engine); //before view engine set up
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

//express session config
app.use(require('express-session')({
	secret:process.env.EXPRESS_SESSION,
	resave: false,
	saveUninitialized: false
}));
//passport
app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set local variables 
app.use((req,res,next)=>{
  res.locals.title = 'SaVagEz';
	res.locals.currentUser = req.user; //adds req.user to all routes
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use('/', indexRouter);
app.use('/caves/:id/requests', requestRouter);
app.use('/caves/:id/jobs', jobsRouter);
app.use('/caves', cavesRouter);


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
