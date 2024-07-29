const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
        kMaxLength : 50
    },
    continents: {
        type: String,
        default: ""
    },
    images: {
        type: Array,
        default: []
    },
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }