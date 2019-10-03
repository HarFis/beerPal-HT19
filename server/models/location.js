var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    name: { type: String, required:true },
    typeOfLocation: { type: String, required: true}
});

module.exports = mongoose.model('locations', locationSchema);
