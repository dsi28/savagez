const express = require('express'),
    router = express.Router(),
    {   cavesIndex,
        cavesNew,
        cavesCreate,
        cavesShow,
        cavesEdit,
        cavesUpdate,
        cavesDelete } = require('../controllers/caves'),
        {asyncErrorHandler} = require('../middleware');
//routes for '/caves'

router.get('/', cavesIndex);

router.get('/new', cavesNew);

router.post('/', asyncErrorHandler(cavesCreate));

router.get('/:id', asyncErrorHandler(cavesShow));

router.get('/:id/edit', asyncErrorHandler(cavesEdit));

router.put('/:id', asyncErrorHandler(cavesUpdate));

router.delete('/:id', asyncErrorHandler(cavesDelete));

module.exports = router;