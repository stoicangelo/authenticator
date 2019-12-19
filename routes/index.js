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

router.get('/products', checkAuthenticated, function(req, res, next) {
  res.render('products', { title: 'Products'});
});

router.get('/services', checkAuthenticated, function(req, res, next) {
  res.render('services', { title: 'Services'});
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
