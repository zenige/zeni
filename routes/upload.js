const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const fs = require('fs');
const mongodb = require('mongodb');
const User = require('../models/user');
const router = express.Router();
const Pic = require('../models/zeni');
const user = require('../models/user');
//app.use(bodyParser.urlencoded({extended:true}))

var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public')
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname + '-'+Date.now()+ path.basename(file.originalname));
  }
})



var upload = multer({
  storage:storage
})



const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url,{
  useUnifiedTopology:true,useNewUrlParser:true
},(err,client) =>{
  if(err) return console.log(err);

  db = client.db('project')

 
})
// router.get('/addphoto', function(req,res){
//   res.render('addphoto');
// });

// router.get('/',(req,res) =>{
//   res.sendFile(__dirname+'/index.html')
// })
// router.get('/addphoto', function(req,res){
//   res.render('addphoto');
// });

router.get("/addphoto", function(req,res){
  User.findById(req.params.id,function(err,foundPic){
      res.render("addphoto",{Pic: foundPic});
  })
});


// router.post('/uploadfile',upload.single('myFile'),(req,res,next)=>{
//   const file = req.file;

//   if(!file){
//     const error = new Error("please  uppload a ff");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(file);
  
// })


router.post("/uploadphoto",upload.single('myImage'),(req,res) =>{
  
  // var finalImg = {
  //     imname:req.file.filename

  // };
  user.findByIdAndUpdate(req.user.id,{imname:req.file.filename},function(err,updatePic){

    res.redirect('/profile');
  })
  
  
})

router.post("/uploadphotoo",(req,res) =>{
  var i_fname = req.body.Firstname;
  var i_lname = req.body.Lastname;
  user.findByIdAndUpdate(req.user.id,{Firstname:req.body.Firstname,Lastname:req.body.Lastname,mail:req.body.mail},function(err,updatePic){

          res.redirect('/profile');
          console.log(err);
      
  })
});

router.post('/uploadphotosell', upload.single('image'), function(req,res){
  let n_name = req.body.name;
  let n_image = req.file.filename;
  let n_desc = req.body.desc;
  let t_tag = req.body.tag1;
  
  let t_author = {
    id: req.user._id,
    username: req.user.username
  }
  let n_all = {name:n_name,image:n_image,desc:n_desc,author:t_author,like:[],number_like:0};
  Pic.create(n_all,async function(err,newpic){
    if(err){
        console.log(err);
    } else {

        for (let tag of t_tag){
          await newpic.tag.push(tag);
        }
        await newpic.save(function(err,success){

        });
        console.log("save");
        res.redirect('/zeni');
    }
  });
});

// router.post("/uploadphotosell",upload.single('image'),(req,res) =>{
//   let n_name = req.body.name;
//   let n_image = req.file.filename;
//   let n_desc = req.body.desc;
//   let n_tag1 = [{tag1: req.body.tag1,tag2:req.body.tag1}]
//   let n_author = {
//       id: req.user._id,
//       username: req.user.username
//   };
//   console.log(req.file);
//   let n_all = {name:n_name,image:n_image,desc:n_desc,author: n_author,tag:n_tag1}
//   Pic.create(n_all, function(error,newCard){
//     if(error){
//       console.log(error);
//     }
//     else{
//       console.log("New Image Added");
//       res.redirect('/zeni');
//     }
//   })
//   // db.collection('tarots').insert({image:req.file.filename,name:req.body.name,desc:req.body.desc,username:req.user.username,tag1:req.body.tags1,tag2:req.body.tags2,tag3:req.body.tags3},function(err,result){
//   //   console.log(result);
//   // })
 
// })

//   db.collection('tarots').insertOne({image:req.file.filename}  {
//       console.log(result);
//       if(err) return console.log(err);
//       console.log("save to database2");

//   })
//   res.redirect('/tarot');
// })



router.get('/profile', function(req,res){
  res.render('profile');
});

router.post('/profile', function(req,res){
  db.collection('users').updateOne(req.user,{$set:{Firstname:req.body.fname,Lastname:req.body.lname,mail:req.body.mail}},(err,result) => {

      if(err) return console.log(err);
      console.log("save to database");
  })
  res.redirect('/Portfolio');
});



module.exports = router;