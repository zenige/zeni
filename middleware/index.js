const zeni = require('../models/user');

let middlewareObj = {};



middlewareObj.checkAdmin = function(req,res,next){
    if(req.isAuthenticated()){
        zeni.findById(req.user.id, function(err, foundzeni){
            console.log("Rank = "+foundzeni);
            if(err){
                res.redirect("back");
            }
            else{
                if(foundzeni.rank == "admin"){
                    return next();
                }
                else{
                    res.redirect("back");
                }
            }
        })
    }else {
        res.redirect("back");
    }
}


    middlewareObj.isLoggedIn = function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'You need to login first');
        res.redirect('/login');
    
    }

module.exports = middlewareObj;
