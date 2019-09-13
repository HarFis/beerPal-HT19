var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    beer: { type: mongoose.Schema.Types.ObjectId, ref : 'beer'},
    score: { type: Number,
            min: 1,
            max: 5 },
    review: { type: String, maxlength: 60}
});

module.exports = mongoose.model('reviews', reviewSchema);
