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

router.get('/',(req,res) =>{
  res.sendFile(__dirname+'/index.html')
})



// router.post('/uploadfile',upload.single('myFile'),(req,res,next)=>{
//   const file = req.file;

//   if(!file){
//     const error = new Error("please  uppload a ff");
//     error.httpStatusCode = 400;
//     return next(error);
//   }
//   res.send(file);
  
// })


router.post("/uploadphotosell",upload.single('image2'),(req,res) =>{
  
  // var finalImg = {
  //     imname:req.file.filename

  // };
  console.log(req.file.filename);
  db.collection('users').updateOne(req.user,{$set:{imname2:req.file.filename}},(err,result) => {
      console.log(result);
      if(err) return console.log(err);
      console.log("save to database");

  })
  res.redirect('/tarot');
})




module.exports = router;