const express = require('express'),
  router = express.Router(),
  {usersIndex, 
  usersCreate,
  usersEdit,
  usersUpdate,
  usersShow,
  usersDelete} = require('../controllers/users'),
  {userIsLoggedIn} = require('../middleware');

      //routes for: /users
      
/* GET users listing. */
router.get('/', userIsLoggedIn,usersIndex);

  //create user
router.post('/',usersCreate);

router.get('/:id/edit',usersEdit);

router.put('/:id',usersUpdate);

router.get('/:id',usersShow);

router.delete('/:id',usersDelete);



module.exports = router;