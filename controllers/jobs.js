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
        console.log('///////////////////////////////');
        console.log(userCaveList);
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

        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
        console.log(job.Cave);
        console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
        res.render('jobs/show', {job, caveUser});
    },

    jobsUpdate(req,res,next){
        Job.update({
            status: req.body.status
        },
            {
                where:{
                    id: req.params.jobId
                },
                returning: true
            }
        );
        console.log(`job update`);
        res.redirect(`/jobs/${job.jobId}`); 
    },

    jobsDelete(req,res,next){
        Job.destroy({
            where:{
                id: req.params.jobId
            },
            limit:1
        });
        console.log('jobs delete');
        res.redirect(`/caves/req.params.id`);
    } 
};