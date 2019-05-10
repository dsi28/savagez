const {Cave, User, Role, CaveUser, Job} = require('../sequelize');

module.exports = { 

    cavesIndex(req,res,next){
        res.render('caves/index');
    },

    cavesNew(req,res,next){
        res.render('caves/new');
    },

    async cavesCreate(req,res,next){
        const roleLandLord = await Role.findOne({
            where:{
                name: 'Land Lord'
            }
        });
        const cave = await Cave.create(req.body);
        const caveUser = await CaveUser.create({
            caveId: cave.id,
            userId: req.user.id,
            role: roleLandLord.name
        });
        req.flash('success', 'Cave created!');
        res.redirect(`/caves/${cave.id}`);
    },

    async cavesShow(req,res,next){
        const cave = await Cave.findOne({
            where:{
                id: req.params.id
            }
        });
        res.render('caves/show', {cave});
    },

    async cavesEdit(req,res,next){
        const cave = await Cave.findOne({
            where:{
                id: req.params.id
            }
        });
        res.render('caves/edit', {cave});
    },

    async cavesUpdate(req,res,next){
        const cave = await Cave.update(req.body, {
            where:{
                id:req.params.id
            }
        });
        console.log(cave);
        req.flash('success', 'Cave updated!');
        res.redirect(`/caves/${req.params.id}`);
    },

    async cavesDelete(req,res,next){
        //after creating jobs routes add job.destroy and caveUser.destroy as prehooks in Cave for destroy
        await Job.destroy({
            where:{
                caveId:req.params.id
            }
        });
        await CaveUser.destroy({
            where: {
                caveId: req.params.id
            }
        });
        await Cave.destroy({
            where:{
                id: req.params.id
            }
        });
        req.flash('success', 'Cave deleted!');
        res.redirect('/caves');
    }
}