const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User =  mongoose.model('user', UserSchema); // user -> model name UserSchema -> The schema we are loading
//User.createIndexes(); // By this we cannot create duplicate values which are needed to be unique [Eg:email shoulb be unique]
module.exports = User;