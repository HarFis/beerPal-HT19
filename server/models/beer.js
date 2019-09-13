var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beerSchema = new Schema({
    name: { type: String} ,
    brewery: { type: mongoose.Schema.Types.ObjectId, ref : 'brewery'},
    type: { type: String },
    alcohol: { type: float},
    avarageRating: [{ mongoose.Schema.Types.ObjectId, ref : 'review'}],
    //TODO IMAGE
    
});

module.exports = mongoose.model('beers', beerSchema);
