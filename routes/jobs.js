const express = require('express'),
    router = express.Router({mergeParams: true}),
    {   jobsCreate,
        jobsNew, 
        jobsIndex,
        jobsShow,
        jobsEdit,
        jobsUpdate,
        jobsDelete  } = require('../controllers/jobs');

    //routes for: /caves/:id/jobs

//create job
router.post('/',jobsCreate);

//new job
router.get('/new',jobsNew);

//get all jobs for one user index
router.get('/',jobsIndex);

//show job
router.get('/:jobId',jobsShow);

//edit job
router.get('/:jobId/edit',jobsEdit);

//update job
router.put('/:jobId',jobsUpdate);

//delete job
router.delete('/:jobId',jobsDelete);


module.exports = router;