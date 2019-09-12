var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    name: { type: String} ,
    review: { type: mongoose.Schema.Types.ObjectId, ref : 'review'},
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'location'},
    dateAndTime: {type: Date},
    postOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    taggedUsers: {type: mongoose.Schema.Types.ObjectId, ref 'user'},
    //image: {}  TO_DO
    
});

module.exports = mongoose.model('posts', postSchema);
