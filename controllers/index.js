const {User} =  require('../sequelize'),
    passport = require('passport');

module.exports = {
    async postRegister(req,res,next){
        const user = await User.create(req.body);
        await req.login(user, (err)=>{
            if (err){ 
                return next(err); 
            }else{
                req.flash('success', 'Welcome to SAvagEz!');
                return res.redirect('/');
            }
        });
    },

    async postLogin(req,res,next){
        await passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            successFlash: 'Welcome back!',
            failureFlash:'User or password is incorrect'
        })(req,res,next);
    },

    getLogin(req,res,next){
        res.render('login');
    },

    getRegister(req,res,next){
        res.render('register');
    },

    getLogout(req,res,next){
        req.logOut();
        req.flash('success','You have been logged out!');
        res.redirect('/');
    }
}