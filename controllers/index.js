const {User} =  require('../sequelize'),
    passport = require('passport');

module.exports = {

    postRegister(req,res,next){
        console.log(req.body);
        User.create(req.body).then(()=>{
            req.flash('success', 'Welcome to SAvagEz!');
            res.redirect('/');
        });
    },

    postLogin(req,res,next){
        passport.authenticate('local', {
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