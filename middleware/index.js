const {Cave} = require('../sequelize');
const middleware = {
    //handles async errors
    asyncErrorHandler: (fn)=>
    (req,res,next)=>{
        Promise.resolve(fn(req,res,next)).catch(next);
    },

    //checks if the user is logged in
    userIsLoggedIn: (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error', 'You must be logged in to do this...');
            console.log('user is not logged in');
            return res.redirect('/login');
        }
    },

    //checks if the user is an admin/landlord
    userIsLandLord: (req,res,next)=>{
        if(req.user.role === 'Land Lord'){
            return next();
        }else{
            req.flash('error', 'You do not have permission to do this...');
            console.log('user is not a landlord');
            res.redirect('back');
        }
    },

    //checks if user has already is alread a part of a Cave as a landlord or as a Savage.
    userHasCave: async(req,res,next)=>{
        if(!req.user.role){
            req.flash('error', 'Sorry, You are already have a cave');
            const cave = await Cave.findOne({
                where:{
                    user: req.user.id
                }
            })
            return res.redirect('back');
        }else{
            return next();
        }
    }
    

}
module.exports = middleware;