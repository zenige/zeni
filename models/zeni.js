const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let picSchema = new mongoose.Schema({
            name: String,
            image: String,
            desc: String,
            sold : Number,
            like : [
                String
                ],
             number_like : Number,
            tag : [],
          
            author: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                username: String
            },
            comments: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Comment'
                }
            ]
        });

picSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Pic', picSchema);