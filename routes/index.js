const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  {User} = require('../sequelize'),
  {postLogin,
   postRegister,
   getLogin,
   getRegister,
   getLogout} = require('../controllers'),
  {asyncErrorHandler} = require('../middleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//auth routes

router.get('/register',getRegister);
router.post('/register',asyncErrorHandler(postRegister));

router.get('/login',getLogin);
router.post('/login',asyncErrorHandler(postLogin));

router.get('/logout',getLogout);

module.exports = router;