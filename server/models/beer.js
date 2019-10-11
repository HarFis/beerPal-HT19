var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Review = require('./review')

var beerSchema = new Schema({
    name: { type: String} ,
    brewery: { type: Schema.Types.ObjectId, ref: 'breweries'},
    type: { type: String },
    alcohol: { type: Number},
    averageRating: { type : Number}    
});

module.exports = mongoose.model('beers', beerSchema);
