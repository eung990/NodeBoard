const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        default: ""
    },
   
},{ timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment }