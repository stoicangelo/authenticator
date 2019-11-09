const express = require('express');
const router = express.Router();
//const cm = require('./common-middleware');
const passport = require('passport');


const bcrypt = require('bcrypt');

// User Model
let User = require('../models/user');

router.get('/login', checkUnauthenticated, function(req, res) {
    res.render('login');
});

router.post('/login', checkUnauthenticated, (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true
    })(req, res, next);
});



router.get('/register', checkUnauthenticated, function(req, res) {
    res.render('register');
});



router.post('/register', checkUnauthenticated, function(req, res) {
    var unm = req.body.username;
    User.findOne({username : unm}).then(function(result){
        if(!result){
            //var hashedPwd = await bcrypt.hash(req.body.pwd, 10);
            bcrypt.hash(req.body.pwd, 10).then(function(hashedPwd){
                var userObj = new User();
                userObj.name = req.body.name;
                userObj.username = unm;
                userObj.password = hashedPwd;
                userObj.save(function(err){
                    if(err){
                        console.log('there was an error inserting');
                    }else{

                        
                        console.log('new user details inserted to db');
                        res.redirect('/');

                    }
                });
            });
        }
        else{
            res.render('register', {userExists: true});
        }
    })
});

router.get('/logout' , checkAuthenticated, function(req, res){
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
});

function checkUnauthenticated(req, res, next){
    if(req.isAuthenticated()){
        return redirect('/auth/login');
    }
    else{
        next();
    }
}

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/auth/login');
    }
  }

module.exports = router;