var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postOwner = require('../models/user');

var postSchema = new Schema({
    review: { type: mongoose.Schema.Types.ObjectId, 
        ref : 'reviews'},
    location: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'locations'},
        dateAndTime: {type: Date},
    postOwner: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', required: true}  
});

module.exports = mongoose.model('posts', postSchema);



