const express = require('express'),
    router = express.Router(),
    {   cavesNew,
        cavesCreate,
        cavesShow,
        cavesEdit,
        cavesUpdate,
        cavesDelete } = require('../controllers/caves');
//routes for '/caves'

router.get('/caves/new', cavesNew);

router.post('/caves', cavesCreate);

router.get('/caves/:id', cavesShow);

router.get('/caves/:id/edit', cavesEdit);

router.put('/caves/:id', cavesUpdate);

router.delete('/caves/:id', cavesDelete);

module.exports = router;