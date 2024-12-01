var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require('./users')

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/profile', isLoggedIn ,function(req, res) { //Before fn(req,res), if we write any fn name(isLoggedIn),that means when someone will open /profile, then before that, isLogged fn will run, and in isLoggedIn fn, we write if user is logged in then return next() means return back to profile route and run the next code
  res.render('profile');  //this kind of route where isLoggedIn kind of fn is written , is called prtected route bcoz until the condition inside isLoggedIn fn isnt satisfy, user cant OPEN /PROFILE (if we write localhost://3000/profile whithout logged in, it will not open)
});

router.get('/loginPage',function(req,res){
  res.render('loginPage');
})


//register route
router.post('/register',function(req,res){
  var userdata = new userModel({
    username : req.body.username,
    secret : req.body.secret
  });
  
  userModel.register(userdata, req.body.password)    //this code is registering user
  .then(function (registereduser){
    passport.authenticate("local")(req,res,function(){  //this code tells after registering , user is logged in
      res.redirect('/profile')
    })
  })
});

router.post('/login',passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/"
}), function(req,res) { })

router.get('/logout',function(req,res){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/');
  });
})

function isLoggedIn(req,res,next){  // in isLoggedIn fn, we write if user is logged in then return next() means return back to calling fn/route and run the next code of that fn
   if(req.isAuthenticated()){
    return next();
   }
   res.redirect('/');
}


module.exports = router;
