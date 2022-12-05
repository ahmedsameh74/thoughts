const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    email: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)