const {Cave, CaveUser, Request} = require('../sequelize');
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
    userIsLandLord: async(req,res,next)=>{
        const caveUser = await CaveUser.findOne({
            where: {
                username:req.user.username,
                caveId:req.params.id
            }
        });
        if(caveUser && caveUser.role === 'Land Lord'){
            return next();
        }else{
            req.flash('error', 'You do not have permission to do this...');
            console.log('user is not a landlord');
            res.redirect('back');
        }
    },
    //if is loggedin they cannot get to log in register. 
    validateLoginRegister: (req,res,next)=>{
        if(req.isAuthenticated()){
            req.flash('error', `You are currently logged in as ${req.user.username}. Please log out first.`);
            console.log('User already logged in');
            return res.redirect('back');
        }else{
            return next();
        }
    },
    
    //if user is not logged in they cannot get to logout
    validateLogout: (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error', `You are not currently signed in to any account.`);
            console.log('No user logged in.');
            return res.redirect('/login');
        }
    },

    //check that the user does not have a pending request with a cave
    validatePendingRequests: async(req,res,next)=>{
        const request = await Request.findOne({
            where:{
                username: req.user.username,
                caveId: req.params.id,
                status: 'pending'
            }
        });
        console.log(request);
        if(!request){
            return next();
        }else{
            req.flash('error', 'You already have pending request with this cave');
            return res.redirect('/caves');
        }
    }

}
module.exports = middleware;