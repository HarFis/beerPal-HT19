var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postOwner = require('../models/user');

var postSchema = new Schema({
    title: { type: String} ,
    review: { type: mongoose.Schema.Types.ObjectId, 
        ref : 'review'},
    location: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'location'},
    dateAndTime: {type: Date, default : Date.now()},
    postOwner: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'},
    taggedUsers: [String],
    //image: {}  TO_DO
    
});

module.exports = mongoose.model('posts', postSchema);
