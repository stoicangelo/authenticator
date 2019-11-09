module.exports = {
    checkAuthenticated : function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect('/auth/login');
        }
    },


    checkUnuthenticated : function(req, res, next){
        if(req.isAuthenticated()){
            return redirect('/auth/login');
        }
        else{
            next();
        }
    }
}   

// module.exports = checkAuthenticated;
// module.exports = checkUnuthenticated;