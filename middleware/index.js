
const middleware = {
    asyncErrorHandler: (fn)=>
    (req,res,next)=>{
        Promise.resolve(fn(req,res,next)).catch(next);
    },

    userIsLoggedIn: (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
            console.log('user is not logged in');
            return res.redirect('/login');
        }
    },

    userIsLandLord: (req,res,next)=>{
        if(req.user.role === 'Land Lord'){
            return next();
        }else{
            console.log('user is not a landlord');
            res.redirect('back');
        }
    }
    

}
module.exports = middleware;