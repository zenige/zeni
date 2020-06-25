const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

let sellSchema = new mongoose.Schema({
            name: String,
            image: String,
            desc: String,
            comments: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Comment'
                }
            ]
        });

sellSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('sell', sellSchema);