const {Cave, User, Role} = require('../sequelize');

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
        req.body.landLord = req.user.id;
        const cave = await Cave.create(req.body);
        await User.update({
            role: roleLandLord.name
        }, {
            where:{
                id: req.user.id
            }
        });
        console.log(cave);
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
        res.redirect(`/caves/${req.params.id}`);
    },

    async cavesDelete(req,res,next){
        await Cave.destroy({
            where:{
                id: req.params.id
            }
        });
        res.redirect('/caves');
    }


}