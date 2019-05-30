const {User, Cave, CaveUser} = require('../sequelize');

module.exports = {
    usersIndex (req, res, next){
        res.redirect(`/users/${req.user.username}`);
    },

    async usersUpdate(req,res,next){
        await User.update(req.body, {
            where: {
                username: req.params.username
            }
        })
        console.log('user updated');
        req.flash('success', 'User updated!');
        res.redirect(`/users/${req.params.username}`);
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
    }

};