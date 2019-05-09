const express = require('express'),
    router = express.Router(),
    {   cavesIndex,
        cavesNew,
        cavesCreate,
        cavesShow,
        cavesEdit,
        cavesUpdate,
        cavesDelete } = require('../controllers/caves');
//routes for '/caves'

router.get('/', cavesIndex);

router.get('/new', cavesNew);

router.post('/', cavesCreate);

router.get('/:id', cavesShow);

router.get('/:id/edit', cavesEdit);

router.put('/:id', cavesUpdate);

router.delete('/:id', cavesDelete);

module.exports = router;