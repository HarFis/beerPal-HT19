var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beerSchema = new Schema({
    name: { type: String} ,
    brewery: { type: mongoose.Schema.Types.ObjectId, ref: 'breweries'},
    type: { type: String },
    alcohol: { type: Number},
    averageRating: { type : Number}
    //TODO IMAGE
    
});

module.exports = mongoose.model('beers', beerSchema);
