const express = require('express'),
  router = express.Router(),
  {usersIndex, 
  usersCreate,
  usersEdit,
  usersUpdate,
  usersShow,
  usersDelete} = require('../controllers/users'),
  {userIsLoggedIn,
  userProfileAccess} = require('../middleware');

      //routes for: /users
      
/* GET users listing. */
router.get('/', userIsLoggedIn,usersIndex);

  //create user
router.post('/',usersCreate);

router.get('/:id/edit',usersEdit);

router.put('/:id', userIsLoggedIn, userProfileAccess, usersUpdate);

    //user show
router.get('/:id',usersShow);

router.delete('/:id',usersDelete);



module.exports = router;