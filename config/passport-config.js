const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = function(passport) {

    const authenticateUser = (username, password, done) => {
        User.findOne({username : username}).then(function(user){
            if(!user){
                return done(null, false, {message : 'No User with the email'});
            }
            bcrypt.compare(password, user.password).then(function (isMatch) {
                if(isMatch){
                    return done(null, user);  
                }else{
                    return done(null, false, {message : 'Incorrect Password'});
                }
            }).catch(function(err){
                return done(err);
            });
        }).catch(function(err){
            console.log('error occured while fetching user : ' + err);
        });
    }
    
    passport.use(new LocalStrategy(authenticateUser));
    
    passport.serializeUser(function(user, done){
        return done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}