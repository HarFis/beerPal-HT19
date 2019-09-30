var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Review = require('./review')

var beerSchema = new Schema({
    name: { type: String} ,
    brewery: { type: Schema.Types.ObjectId, ref: 'breweries'},
    type: { type: String },
    alcohol: { type: Number},
    averageRating: { type : Number}
    //TODO IMAGE
    
});

//Maybe usable if saving Reviews in beer as reviews array 
/*beerSchema.pre('remove', async function(next) {
    try{
        await Review.remove({
            "_id": {
                $in: this.reviews
            }
        });
        next();
        }
    catch(err) {
        next(err)
    }
});*/

module.exports = mongoose.model('beers', beerSchema);
