const {Job, User} = require('../sequelize');

module.exports = {
    jobsCreate(req,res,next){
        req.body.UserId = req.params.id;
        Job.create(req.body).then((job)=>{
            res.rediret(`/users/${req.params.id}/jobs`)
        });
    },

    jobsNew(req,res,next){
        User.findOne({
            where: {
                id: req.params.id
            }
        }).then((user)=>{
            console.log('new user');
            res.render(`users/new`,{user});
        })
    },

    jobsIndex(req,res,next){
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
    },

    jobsShow(req,res,next){
        Job.findOne({
            where:{
                id: req.params.jobId
            }
        }).then((job)=>{
            console.log('show job');
            res.render(`jobs/show`, {job});
        })
    },

    jobsEdit(req,res,next){
        Job.findOne({
        where:{
            id: req.params.jobId
        }
        }).then((job)=>{
            console.log('edit job');
            res.render(`jobs/edit`, {job});
        })
    },

    jobsUpdate(req,res,next){
        Job.update(req.body,
            {
                where:{
                    id: req.params.jobId
                },
                returning: true
            }
        ).then((job)=>{
            console.log(`job update`);
            res.redirect(`/users/${req.params.id}/jobs`);    
        })
    },

    jobsDelete(req,res,next){
        Job.destroy({
            where:{
                id: req.params.jobId
            },
            limit:1
        }).then(()=>{
            console.log('jobs delete');
            res.redirect(`/users/${req.params.id}/jobs`);
        })
    } 

};