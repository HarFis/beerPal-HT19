var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    name: { type: String },
    adress: { type: String },
    typeOfLocation: { type: String}
    
});

module.exports = mongoose.model('locations', locationSchema);
