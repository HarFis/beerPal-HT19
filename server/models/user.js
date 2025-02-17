var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var posts = require('../models/post');

var userSchema = new Schema({
    username : { type : String,
        required : true, dropDups : true},
    mail : { type : String, match: /.+@.+\..+/, unique: true, required: true, dropDups : true},
    password : { type : String},
    // TODO PROFILE PICTURE
    following : [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'}]
    
});

module.exports = mongoose.model('users', userSchema);
