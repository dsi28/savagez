const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  {User} = require('../sequelize'),
  {postLogin,
   postRegister,
   getLogin,
   getRegister,
   getLogout} = require('../controllers'),
  {
    asyncErrorHandler,
    validateLoginRegister,
    validateLogout
  } = require('../middleware'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//auth routes

router.get('/register', validateLoginRegister, getRegister);
router.post('/register', validateLoginRegister, asyncErrorHandler(postRegister));

router.get('/login', validateLoginRegister, getLogin);
router.post('/login', validateLoginRegister, asyncErrorHandler(postLogin));

router.get('/logout', validateLogout, getLogout);

module.exports = router;