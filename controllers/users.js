const {User} = require('../sequelize');

module.exports = {
    usersIndex (req, res, next){
        User.findAll().then(users => res.json(users));
    },

    usersCreate (req,res,next){
        User.create(req.body).then(user=>res.json(user));
    },

    usersEdit(req,res,next){
        User.findOne({
            where:{
                id: req.params.id
            }
        }).then((user)=>{
            console.log('get user edit');
            res.render('users/edit', {user});
        });
    },

    usersUpdate(req,res,next){
        User.update(req.body,{
            where:{
                id: req.params.id
            },
            returning: true
        }).then((user)=>{
            console.log('user updated');
            res.redirect(`/users/${req.params.id}`);
        })
    },

    usersShow(req,res,next){
        User.findOne({
            where:{
                id:req.params.id
            }
        }).then((user)=>{
            console.log('user show');
            res.render('users/show', {user});
        });
    },

    usersDelete(req,res,next){
        User.destroy({
            where: {
                id: req.params.id    
            },
            limit:1
        }).then(()=>{
            console.log('user delete');
            res.redirect('/users')
        });
    }

};