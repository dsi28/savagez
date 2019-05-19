const {Cave, User, Role, CaveUser, Job, Request} = require('../sequelize'),
    Sequelize = require('sequelize');

module.exports = {
    async requestCreate(req,res,next){
        await Request.create({
            username: req.user.username,
            caveId: req.params.id
        });
        req.flash('success', 'Request has been sent!');
        res.redirect('/caves');
    },

    async requestUpdate(req,res,next){
        const request = await Request.update({
            status: req.body.status
        }, {
            where:{
                requestId:req.params.requestId
            }
        });
        if(request.status === 'accepted'){
            await CaveUser.create({
                username: request.username,
                caveId: request.caveId,
                role: 'savage'
            });
            req.flash('success', `${request.username} has been added to the cave`);
        }else if(request.status === 'declined'){
            req.flash('success', `${request.username} request has been denied`);
        }
        res.redirect('back');
    }

}