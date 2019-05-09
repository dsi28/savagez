const express = require('express'),
    router = express.Router(),
    {   cavesIndex,
        cavesNew,
        cavesCreate,
        cavesShow,
        cavesEdit,
        cavesUpdate,
        cavesDelete 
    } = require('../controllers/caves'),
    {   asyncErrorHandler,
        userIsLoggedIn,
        userIsLandLord
    } = require('../middleware');
//routes for '/caves'

router.get('/', userIsLoggedIn, cavesIndex);

router.get('/new', userIsLoggedIn, cavesNew);

router.post('/', userIsLoggedIn, asyncErrorHandler(cavesCreate));

router.get('/:id', userIsLoggedIn, asyncErrorHandler(cavesShow));

router.get('/:id/edit', userIsLoggedIn, userIsLandLord, asyncErrorHandler(cavesEdit));

router.put('/:id', userIsLoggedIn, userIsLandLord, asyncErrorHandler(cavesUpdate));

router.delete('/:id', userIsLoggedIn, userIsLandLord, asyncErrorHandler(cavesDelete));

module.exports = router;