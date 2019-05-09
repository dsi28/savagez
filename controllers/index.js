const {User} =  require('../sequelize'),
    passport = require('passport');

module.exports = {
    postRegister(req,res,next){
        console.log(req.body);
        User.create(req.body).then(()=>{
          res.redirect('/');
        });
    },

    postLogin(req,res,next){
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
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
        res.redirect('/');
    }
}