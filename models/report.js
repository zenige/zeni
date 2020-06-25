const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');
const { Int32, Double } = require('mongodb');

let reportSchema = new mongoose.Schema({
            name: String,
            image: String,
            desc: String,
            tag1: String,
            tag2: String,
            tag3: String,
           
            author: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Pic'
                },
                username: String
            },
});

reportSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('report', reportSchema);