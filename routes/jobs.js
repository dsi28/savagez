const express = require('express'),
    router = express.Router({mergeParams: true}),
    {Job, User} = require('../sequelize');

    //routes for: /users/:id/jobs

    //create job
router.post('/', (req,res,next)=>{
    req.body.UserId = req.params.id;
    Job.create(req.body).then((job)=>{
        res.json(job);
    }
    );
});


    //get all jobs for one user
router.get('/', (req,res,next)=>{
    User.findOne({
        where:{
            id: req.params.id
        }
    }).then(
        (user)=>{
            Job.findAll({
                where:{
                    UserId: user.dataValues.id
                }
            }).then(
                (job)=>{
                    console.log(job);
                    res.json(job);
                }
            )
        }
    );
});


module.exports = router;