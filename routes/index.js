var express = require('express');
var router = express.Router();
// const cm = require('./common-middleware');

/* GET home page. */
router.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});
router.get('/', checkAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Home', name: req.user.name });
});

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  else{
      res.redirect('/auth/login');
  }
}


module.exports = router;
