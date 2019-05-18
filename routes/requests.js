const express = require('express'),
    router = express.Router(),
    {   
        requestUpdate,
        requestCreate
    } = require('../controllers/requests'),
    {   asyncErrorHandler,
        userIsLoggedIn,
        userIsLandLord
    } = require('../middleware');

    //routes for: '/caves/:id/requests'

router.get('/:requestId', asyncErrorHandler(requestShow));

router.get('/new', asyncErrorHandler(requestNew));

router.post('/', asyncErrorHandler(requestCreate));

router.get('/:requestId/edit', asyncErrorHandler(requestEdit));

router.put('/requrestId', asyncErrorHandler(requestUpdate));

router.delete('/requestId', asyncErrorHandler(requestDelete));

router.get('')
module.exports = router;