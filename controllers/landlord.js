const {Job, User, Cave, CaveUser, Request} = require('../sequelize');

module.exports = {
    // async landlordShow(req,res,next){

    //     res.render(`landlords/show`);
    // },
    
    async landlordIndex(req,res,next){
        let userList = await CaveUser.findAll({
            where: {
                caveId: req.params.id,
            }
        });
        let requestList = await Request.findAll({
            where:{
                caveId: req.params.id
            }
        });
        let cave = await Cave.findOne({
            where:{
                caveId: req.params.id
            }
        });
        res.render(`landlords/show`, {userList, requestList, cave});
    },

    async landlordUpdate(req,res,next){
        if(req.body.status == 'remove'){
            await CaveUser.destroy({
                where:{
                    username: req.params.username
                }
            });
        }
        res.redirect(`/caves/${req.params.id}/landlord`);
    }

}