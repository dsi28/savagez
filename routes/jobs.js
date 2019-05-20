const express = require('express'),
    router = express.Router({mergeParams: true}),
    {   jobsCreate,
        jobsNew, 
        jobsShow,
        jobsUpdate,
        jobsDelete  } = require('../controllers/jobs'),
    {
        asyncErrorHandler,
        userIsLoggedIn,
        userIsLandLord
    }= require('../middleware');

    //routes for: /caves/:id/jobs

//create job
router.post('/', userIsLoggedIn, userIsLandLord, asyncErrorHandler(jobsCreate));

//new job
router.get('/new', userIsLoggedIn, userIsLandLord, asyncErrorHandler(jobsNew));

//show job
router.get('/:jobId', userIsLoggedIn, asyncErrorHandler(jobsShow));

//update job
router.put('/:jobId', userIsLoggedIn, asyncErrorHandler(jobsUpdate));

//delete job
router.delete('/:jobId', userIsLoggedIn, userIsLandLord, asyncErrorHandler(jobsDelete));

module.exports = router;