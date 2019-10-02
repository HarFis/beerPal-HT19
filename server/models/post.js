var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postOwner = require('../models/user');

var postSchema = new Schema({
    title: { type: String} ,
    review: { type: mongoose.Schema.Types.ObjectId, 
        ref : 'reviews'},
    location: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'locations'},
    dateAndTime: {type: Date, default : Date.now},
    postOwner: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', required: true},
    // TODO taggedUsers: [String],
    //image: {}  TO_DO
    
});

module.exports = mongoose.model('posts', postSchema);



