var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var reviewSchema = new Schema({
    beer: { type: Schema.Types.ObjectId, ref : 'beers'}, //REQUIRED
    score: { type: Number, 
            required: true, 
            min: 1,
            max: 5 },
    textReview: { type: String, maxlength: 61}, 
    created: { type: Date }
});

module.exports = mongoose.model('reviews', reviewSchema);
