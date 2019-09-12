var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String},
    mail: { type: String},
    password: { type: String},
    // TODO PROFILE PICTURE
    friends: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
    
});

module.exports = mongoose.model('users', userSchema);
