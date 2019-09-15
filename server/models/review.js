var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var reviewSchema = new Schema({
    beer: { type: Schema.Types.ObjectId, ref : 'beer'}, //REQUIRED
    score: { type: Number, 
            required: true, 
            min: 1,
            max: 5 },
    review: { type: String, maxlength: 60},
    created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('reviews', reviewSchema);
