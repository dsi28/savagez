const express = require('express'),
    router = express.Router(),
    {   
        requestIndex,
        requestShow,
        requestNew,
        requestEdit,
        requestCreate,
        requestDelete
    } = require('../controllers/requests'),
    {   asyncErrorHandler,
        userIsLoggedIn,
        userIsLandLord
    } = require('../middleware');

    //routes for: '/caves/:id/requests'

router.get('/', asyncErrorHandler(requestIndex));

router.get('/:requestId', asyncErrorHandler(requestShow));

router.get('/new', asyncErrorHandler(requestNew));

router.post('/', asyncErrorHandler(requestCreate));

router.get('/:requestId/edit', asyncErrorHandler(requestEdit));

router.put('/requrestId', asyncErrorHandler(requestCreate));

router.delete('/requestId', asyncErrorHandler(requestDelete));

router.get('')
module.exports = router;