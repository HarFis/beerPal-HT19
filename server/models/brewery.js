var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var ObjectId = mongoose.Types.ObjectId;

var brewerySchema = new Schema({
    name: { type: String},
    avgRating: { type : Number},
    adress: { type: String},
    link: { type: String}, 
    
});

module.exports = mongoose.model('breweries', brewerySchema);

