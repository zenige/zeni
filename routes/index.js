const express = require('express'),
      router = express.Router();
      passport = require('passport'),
      Report = require('../models/report'),
      middleware = require('../middleware'),
      User = require('../models/user');

router.get('/',function(req,res){
    res.render('welcome');
});

router.get('/login', function(req,res){
    res.render('login');
});
router.post('/login', passport.authenticate('local',{
    successRedirect: '/Portfolio',
    failureRedirect: 'login'
  }),function(req, res){
  });

// router.post('/login', passport.authenticate('local',{
//     successRedirect: '/Portfolio',
//     failureRedirect: 'login'
// }),function(req, res){
// });

router.get('/logout', function(req,res){
    req.logout();
    req.flash('success','You log out successfully');
    res.redirect('/');
});

router.get('/signup', function(req,res){
    res.render('signup');
});
router.get('/Home', function(req,res){
    res.render('Home');
});

router.post('/signup', function(req,res){
    User.register(new User({username: req.body.username,mail: req.body.mail,Firstname: req.body.Firstname,rank:"user",coin:"0",free:"3",count:"0",Lastname: req.body.Lastname,imname:"profile.jpeg"}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('signup');
        }
        passport.authenticate('local')(req,res,function(){
            console.log(user);
            req.flash('success','Welcome , ' + user.username);
            res.redirect('/Portfolio');
        });
    });
});

router.get("/Portfolio",middleware.isLoggedIn, function(req,res){
    
    Pic.find({},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("Portfolio",{Pic:allPic});
        }
    })
});
router.get("/admin",middleware.checkAdmin, function(req,res){
    
    Report.find({},function(error, allReport){
        if(error){
            console.log("Error!");
        } else {
            res.render("admin",{Report:allReport});
        }
    })
});


router.get("/profile",middleware.isLoggedIn, function(req,res){
    
    Pic.find({},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("profile",{Pic:allPic});
        }
    })
});

router.get('/game',middleware.isLoggedIn ,function(req,res){
    console.log("Free = "+req.user.free);
    res.render("game",{free: req.user.free});
});



module.exports = router;