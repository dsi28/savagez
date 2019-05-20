const {Job, User, Cave, UserCave} = require('../sequelize');

module.exports = {
    async jobsCreate(req,res,next){
        const job = await Job.create(req.body.job);
        req.flash('success', 'Job created...');
        res.redirect(`\jobs\${job.jobId}`);
    },

    async jobsNew(req,res,next){
        const cave = await Cave.findOne({
            where: {
                caveId: req.params.id
            }
        });
        const userCaveList = UserCave.findAll({
            where:{
                caveId: req.params.id
            }, 
            attributes: ['username']
        })
        res.render(`jobs/new`,{cave, userCaveList});
    },

    async jobsShow(req,res,next){
        const job = await Job.findOne({
            include:{
                model: 'Cave',
                through: { attributes: [] },
                where:{
                    caveId: req.params.id
                }
            },
            where:{
                id: req.params.jobId
            }
        });
        console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
        console.log(job);
        console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
        res.render('jobs/show', {job});
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