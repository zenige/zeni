const   express = require("express"),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
        flash = require('connect-flash'),
        passport = require('passport'),
        multer  = require('multer'),
        methodOverride = require('method-override'),
        passportLocal = require('passport-local'),
        passportLocalMongoose = require('passport-local-mongoose'),
        User = require('./models/user'),
        Tarot = require('./models/selldb'),
        //seedDB = require('./seeds'),
        tarotRoutes = require('./routes/zeni'),
        indexRoutes = require('./routes/index'),
        commentsRoutes = require('./routes/comments'),
        uploadpicRoutes = require('./routes/upload'),
        upsaleto = require('./routes/upsale');
       

        const PORT = process.env.PORT || 3000;
const   app = express();

mongoose.connect('mongodb+srv://as77907397:028024102@cluster0-bnq0d.mongodb.net/<Cluster0>?retryWrites=true&w=majority', {useNewUrlParser: true});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash()); 
//seedDB();

app.use(require('express-session')({
    secret: 'test',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/',indexRoutes);
app.use('/zeni',tarotRoutes);
app.use('/zeni/:id/comments',commentsRoutes);
app.use('/upload',uploadpicRoutes);
app.use('/upsale',upsaleto);




app.listen(PORT, () => {
    console.log("Server is ready on port :${ PORT }");
});