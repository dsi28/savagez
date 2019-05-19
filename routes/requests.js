const express = require('express'),
    router = express.Router({mergeParams: true}),
    {   
        requestUpdate,
        requestCreate
    } = require('../controllers/requests'),
    {   asyncErrorHandler,
        userIsLoggedIn,
        userIsLandLord,
        validatePendingRequests
    } = require('../middleware');

    //routes for: '/caves/:id/requests'

router.post('/', userIsLoggedIn, asyncErrorHandler(validatePendingRequests), asyncErrorHandler(requestCreate));

router.put('/:requestId',  asyncErrorHandler(requestUpdate)); //middleware: userIsLoggedIn, userIsLandLord,

module.exports = router;