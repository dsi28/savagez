const {User, Cave, CaveUser} = require('../sequelize');

module.exports = {
    usersIndex (req, res, next){
        res.redirect(`/users/${req.user.username}`);
    },

    usersCreate (req,res,next){
        User.create(req.body).then(user=>res.json(user));
    },

    usersEdit(req,res,next){
        User.findOne({
            where:{
                username: req.params.username
            }
        }).then((user)=>{
            console.log('get user edit');
            res.render('users/edit', {user});
        });
    },

    usersUpdate(req,res,next){
        User.update(req.body,{
            where:{
                username: req.params.username
            },
            returning: true
        }).then((user)=>{
            console.log('user updated');
            res.redirect(`/users/${req.params.username}`);
        })
    },

    async usersShow(req,res,next){
        const user = await User.findOne({
            where:{
                username:req.params.username
            }
        });
        const caveList = await Cave.findAll({
            include: [{
                model: User,
                through: { attributes: [] },
                where:{
                    username: req.user.username
                }
            }]
        });
        res.render('users/show', {user, caveList});
    },

    usersDelete(req,res,next){
        User.destroy({
            where: {
                username: req.params.username    
            },
            limit:1
        }).then(()=>{
            console.log('user delete');
            res.redirect('/users')
        });
    }

};