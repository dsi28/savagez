const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  {User} = require('../sequelize'),
  {postLogin,
   postRegister,
   getLogin,
   getRegister,
   getLogout} = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//auth routes

router.get('/register',getRegister);
router.post('/register',postRegister);

router.get('/login',getLogin);
router.post('/login',postLogin);

router.get('/logout',getLogout);

module.exports = router;