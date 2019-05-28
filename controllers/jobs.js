const {Job, User, Cave, CaveUser} = require('../sequelize');

module.exports = {
    async jobsCreate(req,res,next){
        const job = await Job.create(req.body.job);
        req.flash('success', 'Job created...');
        res.redirect(`/caves/${req.params.id}/jobs/${job.jobId}`);   
    },

    async jobsNew(req,res,next){
        const cave = await Cave.findOne({
            where: {
                caveId: req.params.id
            }
        });
        const userCaveList = await CaveUser.findAll({
            where:{
                caveId: req.params.id
            }
        });
        res.render(`jobs/new`,{cave, userCaveList});
    },

    async jobsShow(req,res,next){
        const job = await Job.findOne({
            include: [{
                model: Cave,
                where:{
                    caveId: req.params.id
                }
            }],
            where:{
                jobId: req.params.jobId
            }
        });
        const caveUser = await CaveUser.findOne({
            where:{
                caveId: req.params.id,
                role:'Land Lord'
            }
        });
        res.render('jobs/show', {job, caveUser});
    },

    async jobsUpdate(req,res,next){
        await Job.update({
            status: 'Done'
        },
            {
                where:{
                    jobId: req.params.jobId
                }
            }
        );
        res.redirect(`/caves/${req.params.id}/jobs/${req.params.jobId}`); 
    },

    jobsDelete(req,res,next){
        Job.destroy({
            where:{
                jobId: req.params.jobId
            },
            limit:1
        });
        req.flash('success', 'Job has been deleted...');
        res.redirect(`/caves/${req.params.id}`);
    } 
};