const mongoose = require('mongoose');

const CommSchema = new mongoose.Schema({
    comment: {
        type: String,
        // required: [true, "comment can not be blank."],
    },
    user:{
        type: mongoose.Schema.ObjectId,
    },
    movie: {
        type: mongoose.Schema.ObjectId,
    },
    replyReceived: {
        type: mongoose.Schema.ObjectId,
    }
});

const Comments = mongoose.model('Comment', CommSchema);

module.exports = Comments;