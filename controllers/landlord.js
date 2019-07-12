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
    }

}