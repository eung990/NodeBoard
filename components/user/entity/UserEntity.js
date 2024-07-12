const { kMaxLength } = require('buffer');
const mongoose = require('mongoose');
const { Unique } = require('typeorm');

const userSchema = mongoose.Schema({
    userId: {
        type: Number,
        kMaxLength: 50
    },
    username: {
        type: String,
        trim: true,
        Unique: 1,
        kMaxLength: 50
    },
    email: {
        type: String,
        trim: true,
        Unique: 1,
        kMaxLength: 50
    },
    password: {
        type: Number,
        trim: true,
        kMaxLength: 50
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number,
    
    },
    created_at: {
        type: String,
        trim: true,
        kMaxLength: 50
    },
    updated_at: {
        type: String,
        trim: true,
        kMaxLength: 50
    },



})

const User = mongoose.model('User', userSchema);

module.exports = { User };