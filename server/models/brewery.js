var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brewerySchema = new Schema({
    name: { type: String},
    avgRating: {type: mongoose.Schema.Types.ObjectId, ref: 'beer'},
    adress: { type: String},
    link: { type: String}
    
});

module.exports = mongoose.model('breweries', brewerySchema);
