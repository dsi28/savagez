
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
    }
    

}
module.exports = middleware;