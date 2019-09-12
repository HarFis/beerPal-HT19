var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    beer: { type: mongoose.Schema.Types.ObjectId, ref : 'beer'},
    score: { type: float }
    
});

module.exports = mongoose.model('reviews', reviewSchema);
