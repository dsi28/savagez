const express = require('express'),
  router = express.Router(),
  {usersIndex, 
  usersUpdate,
  usersShow} = require('../controllers/users'),
  {userIsLoggedIn,
  userProfileAccess,
  asyncErrorHandler} = require('../middleware');

      //routes for: /users
      
/* GET users listing. */
router.get('/', userIsLoggedIn,usersIndex);

    //user update
router.put('/:username', userIsLoggedIn, userProfileAccess, asyncErrorHandler(usersUpdate));

    //user show
router.get('/:username', userIsLoggedIn, userProfileAccess, asyncErrorHandler(usersShow));

module.exports = router;