var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beerSchema = new Schema({
    name: { type: String} ,
    brewery: { type: Schema.Types.ObjectId, ref: 'Brewery'},
    type: { type: String },
    alcohol: { type: Number},
    averageRating: { type : Number}
    //TODO IMAGE
    
});

module.exports = mongoose.model('beers', beerSchema);
