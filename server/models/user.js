var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username : { type : String, unique : true, required : true, dropDups : true},
    mail : { type : String},
    password : { type : String},
    // TODO PROFILE PICTURE
    friends : [String]
    
});

module.exports = mongoose.model('users', userSchema);
