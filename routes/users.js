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

router.get('/:username/edit',usersEdit);

router.put('/:username', userIsLoggedIn, userProfileAccess, usersUpdate);

    //user show
router.get('/:username', userIsLoggedIn, userProfileAccess, usersShow);

router.delete('/:username',usersDelete);



module.exports = router;