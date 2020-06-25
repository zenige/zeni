const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');
const { Int32, Double } = require('mongodb');

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    mail: String,
    Firstname: String,
    Lastname: String,
    rank: String,
    imname: String,
    coin: Number,
    free: Number,
    count: Number,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);