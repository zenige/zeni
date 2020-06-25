const zeni = require('../models/zeni');
const report = require('../models/report');
const { search } = require('.');

const express = require('express'),
      router = express.Router();
      Pic = require('../models/zeni'),
      middleware = require('../middleware'),
      Report = require('../models/report')
      
router.get("/", function(req,res){
    
    Pic.find({},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/index",{Pic:allPic});
        }
    })
});

router.get("/sea",middleware.isLoggedIn, function(req,res){

 
    Pic.find({},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/sea",{Pic:allPic});
        }
    })
    }
 
);

// router.get("/search",middleware.isLoggedIn, function(req,res){
//     var search = req.query.search;
//     var searcht = req.query.tag
//     if(search){
//     Pic.find({desc:search,tag:{$in:"Abstract"}},function(err,pic){
//         console.log(pic);
//         res.render("zeni/found",{Pic:pic});
//     })
//     }
// });

router.get('/search',middleware.isLoggedIn, function(req,res){
    if(req.query.search){
        var search = req.query.search;
        const regax = new RegExp(escapeRegex(req.query.search), 'gi');
        Pic.find({name: regax}, function(err, pic){
            if(err){
                console.log(err);
            } else {
                res.render("zeni/found",{Pic:pic});
            }
        })
    }
});

router.get('/cate', function(req,res){
    res.render('zeni/cate');
});


router.get("/abstract", function(req,res){

 
    Pic.find({tag:{$in:"Abstract"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/abstract",{Pic:allPic});
        }
    })
    }
 
);

router.get("/animals", function(req,res){

 
    Pic.find({tag:{$in:"Animals"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/animals",{Pic:allPic});
        }
    })
    }
 
);

router.get("/Fashion", function(req,res){

 
    Pic.find({tag:{$in:"Fashion"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/Fashion",{Pic:allPic});
        }
    })
    }
 
);
router.get("/FoodDrink", function(req,res){

 
    Pic.find({tag:{$in:"FoodDrink"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/FoodDrink",{Pic:allPic});
        }
    })
    }
 
);

router.get("/Buildings", function(req,res){

 
    Pic.find({tag:{$in:"Buildings"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/Buildings",{Pic:allPic});
        }
    })
    }
 
);

router.get("/Nature", function(req,res){

 
    Pic.find({tag:{$in:"Nature"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/Nature",{Pic:allPic});
        }
    })
    }
 
);

router.get("/Miscellaneous", function(req,res){

 
    Pic.find({tag:{$in:"Miscellaneous"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/Miscellaneous",{Pic:allPic});
        }
    })
    }
 
);

router.get("/Holidays", function(req,res){

 
    Pic.find({tag:{$in:"Holidays"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/Holidays",{Pic:allPic});
        }
    })
    }
 
);

router.get("/Sports", function(req,res){

 
    Pic.find({tag:{$in:"Sports"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/Sports",{Pic:allPic});
        }
    })
    }
 
);

router.get("/Transportation", function(req,res){

 
    Pic.find({tag:{$in:"Transportation"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/Transportation",{Pic:allPic});
        }
    })
    }
 
);

router.get("/People", function(req,res){

 
    Pic.find({tag:{$in:"People"}},function(error, allPic){
        if(error){
            console.log("Error!");
        } else {
            res.render("zeni/People",{Pic:allPic});
        }
    })
    }
 
);




router.post("/", function(req,res){
    let n_name = req.body.name;
    let n_image = req.body.image;
    let n_desc = req.body.desc;
    let n_card = {name:n_name,image:n_image,desc:n_desc};
    Pic.create(n_card, function(error,newCard){
        if(error){
            console.log(error); 
        } else {
        
            res.redirect("/zeni");
        }
    });
});



router.post("/zeni/report/:id",middleware.isLoggedIn, function(req,res){
    console.log("id = "+req.params.id);
    Pic.findById(req.params.id,function(err,success){
        let n_name = success.name;
        let n_desc = success.desc;
        let n_image = success.image;
         let n_author = {
                 id: success._id,
                username: req.user.username
                     };
 
  let n_all = {name:n_name,desc:n_desc,author: n_author,image:n_image}
     Report.create(n_all, function(error,newCard){
    if(error){
        console.log(error); 
    } else {
        res.redirect("/zeni");
    }
});
    })
     
  
});

router.post("/zeni/pay",middleware.isLoggedIn, function(req,res){
        if(req.user.coin>=10){
          req.user.coin = req.user.coin-10;
          req.user.save(function(err,success){
          
            res.redirect("back");
          });
        }
        else{
            
             }

});

router.post("/zeni/add5",middleware.isLoggedIn, function(req,res){
      req.user.coin = req.user.coin+5;
      req.user.free = req.user.free-1;
      req.user.save(function(err,success){
      
        res.redirect("/zeni");
      });

});

router.post("/zeni/add10",middleware.isLoggedIn, function(req,res){
    req.user.coin = req.user.coin+10;
    req.user.free = req.user.free-1;
    req.user.save(function(err,success){
    
      res.redirect("/zeni");
    });

});

router.post("/zeni/add1",middleware.isLoggedIn, function(req,res){
    req.user.coin = req.user.coin+1;
    req.user.free = req.user.free-1;
    req.user.save(function(err,success){
    
      res.redirect("/zeni");
    });

});

router.post("/zeni/add0",middleware.isLoggedIn, function(req,res){
    req.user.free = req.user.free-1;
    req.user.save(function(err,success){
    
      res.redirect("/zeni");
    });

});




router.get("/new",middleware.isLoggedIn, function(req,res){
    
    res.render("zeni/new");
});


 router.get("/:id",middleware.isLoggedIn, function(req,res){
    Pic.findById(req.params.id).populate('comments').exec(function(error, idCard){
         if(error){
            console.log(Error);
        } else {
             res.render("zeni/show",{zeni:idCard});
         }
     });
 });

 router.get("/:id/edit", function(req,res){
     Pic.findById(req.params.id,function(err,foundPic){
         res.render("zeni/edit",{Pic: foundPic});
     })
 });





// router.get("/:id",middleware.isLoggedIn, function(req,res){
//     Pic.findById(req.params.id).populate('comments').exec(function(error, foundZeni){
//          if(error){
//             console.log("Error5");
//         } else {
//              res.render("zeni/show",{Pic:foundZeni});
//          }
//      });
//  });

 router.put("/:id", function(req,res){
     Pic.findByIdAndUpdate(req.params.id, req.body.pic,function(err,updatePic){
         if(err){
             res.redirect('/zeni');
             console.log(err);
         }else{
             
             res.redirect('/zeni/'+req.params.id);
         }
     })
 });
 router.delete("/:id", function(req,res){
    Pic.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/zeni'); 
        } else {
             res.redirect('/zeni');
    }
 });
    
})
 

router.put("/zeni/:id",function(req,res){

    Pic.findById(req.params.id,function(err,finished){
      if(err) {
            console.log(err)
              }
      else {                                                       
          Pic.findOne({_id : req.params.id, like: req.body.uid },function(err,F){
            if(F == null) 
              {
              finished.like.push(req.body.uid);
              finished.number_like++;
              console.log("dasdasdasdasda"+finished.number_like);
              finished.save();
              console.log("finsish = "+finished.number_like);
              res.redirect('back');
   
              }
  
            else {
              finished.like.remove(req.body.uid);
              finished.number_like--;
              finished.save();
              console.log(finished.number_like);
              res.redirect('back');
            }
      
          })
     
      }
    });
  });
  
  
 

module.exports = router;

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }