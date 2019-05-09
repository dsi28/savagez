const {Cave} = require('../sequelize');

module.exports = { 

    cavesIndex(req,res,next){
        res.render('caves/index');
    },

    cavesNew(req,res,next){
        res.render('caves/new');
    },

    cavesCreate(req,res,next){
        req.body.landLord = req.user.id;
        Cave.create(req.body).then((cave)=>{
            console.log(cave);
            res.redirect(`/caves/${cave.id}`);
        }).catch((err)=>{
            console.log(err);
            res.redirect('/caves/new');
        });
    },

    cavesShow(req,res,next){
        Cave.findOne({
            where:{
                id: req.params.id
            }
        }).then((cave)=>{
            res.render('caves/show', {cave});
        });
    },

    cavesEdit(req,res,next){
        Cave.findOne({
            where:{
                id: req.params.id
            }
        }).then((cave)=>{
            res.render('caves/edit', {cave});
        });
    },

    cavesUpdate(req,res,next){
        Cave.update(req.body, {
            where:{
                id:req.params.id
            },
            returning:true
        }).then((cave)=>{
            console.log(cave);
            res.redirect(`/caves/${req.params.id}`);
        });
    },

    cavesDelete(req,res,next){
        Cave.destroy({
            where:{
                id:req.params.id
            }
        }).then(()=>{
            res.redirect('/caves');
        });
    }


}