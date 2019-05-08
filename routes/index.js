const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  {User} = require('../sequelize');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//auth
router.post('/register',(req,res)=>{
  User.create(req.body).then(()=>{
    console.log('created user');
  }).catch((err)=>{
    console.log(err);
  })
});

router.post('/login',passport.authenticate('local'),(req,res,next)=>{
  console.log('weraera');
})

// router.post('/login',(req,res,next)=>{
//   User.findOne({
//     where:{
//         username:req.body.username
//     }
//   }).then((logUser)=>{
//     console.log('do it');
//     res.json(logUser);
//   })
// })

module.exports = router;
