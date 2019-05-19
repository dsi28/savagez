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
        const request = await Request.findOne({
            where:{
                requestId: req.params.requestId
            }
        });
        if(!request){
            console.log('no request found');
            req.flash('error', 'no request found');
            res.redirect('/back');
        }else{
            request.status = req.body.status;
            console.log('///////////////////////////////////////////////////');
            console.log(request.status);
            if(request.status === 'accepted'){
                const role = await Role.findOne({
                    where:{
                        name: 'Savage'
                    }
                });
                await CaveUser.create({
                    username: request.username,
                    caveId: request.caveId,
                    role: role.name
                });
                req.flash('success', `${request.username} has been added to the cave`);
            }else if(request.status === 'declined'){
                req.flash('success', `${request.username} request has been denied`);
            }
            await request.save();
            res.redirect('back');
        }
    }

}