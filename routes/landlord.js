const express = require('express'),
    router = express.Router({mergeParams: true}),
    {   landlordShow,
        landlordIndex,
        landlordUpdate } = require('../controllers/landlord'),
    {
        asyncErrorHandler,
        userIsLoggedIn,
        userIsLandLord
    }= require('../middleware');

    //routes for: /caves/:id/landlord

//index
router.get('/', userIsLoggedIn, userIsLandLord, asyncErrorHandler(landlordIndex));

// //show landlord
// router.get('/:jobId', userIsLoggedIn, userIsLandLord, asyncErrorHandler(landlordShow));

// removes a user from a cave
router.put('/:username', userIsLoggedIn, userIsLandLord, asyncErrorHandler(landlordUpdate));

module.exports = router;