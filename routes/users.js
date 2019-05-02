const express = require('express'),
  router = express.Router(),
  {User} = require('../sequelize');

      //routes for: /users
      
/* GET users listing. */
router.get('/', (req, res, next)=>{
  User.findAll().then(users => res.json(users));
});

  //create job
router.post('/', (req,res,next)=>{
  User.create(req.body).then(user=>res.json(user));
});

module.exports = router;