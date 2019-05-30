const express = require('express'),
    router = express.Router({mergeParams: true}),
    {   landlordShow,
        landlordIndex } = require('../controllers/landlord'),
    {
        asyncErrorHandler,
        userIsLoggedIn,
        userIsLandLord
    }= require('../middleware');

    //routes for: /caves/:id/landlord

//index
router.post('/', userIsLoggedIn, userIsLandLord, asyncErrorHandler(landlordIndex));

//show landlord
router.get('/:jobId', userIsLoggedIn, userIsLandLord, asyncErrorHandler(landlordShow));

module.exports = router;