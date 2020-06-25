const express = require('express'),
      router = express.Router();
      Tarot = require('../models/tarot'),
      middleware = require('../middleware');
      
router.get("/",middleware.isLoggedIn, function(req,res){

    Pic.find({},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            console.log(allPic);
            res.render("zeni/Portfolio",{Pic:allPic});
        }
    })
});

router.post("/",middleware.isLoggedIn, function(req,res){
    let n_name = req.body.name;
    let n_image = req.body.image;
    let n_desc = req.body.desc;
    let n_tag1 = req.body.tag1;
    let n_card = {name:n_name,image:n_image,desc:n_desc,tag1:n_tag1};
    Pic.create(n_card, function(error,newCard){
        if(error){
            console.log("error"); 
        } else {
            console.log("New card added.");
            res.redirect("/zeni");
        }
    });
});

router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("zeni/new");
});

router.get("/:id",middleware.isLoggedIn, function(req,res){
    Pic.findById(req.params.id).populate('comments').exec(function(error, idCard){
        if(error){
            console.log("Error");
        } else {
            res.render("zeni/show",{Pic:idCard});
        }
    });
});


module.exports = router;