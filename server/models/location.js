var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
    name: { type: String, required:true },
    typeOfLocation: { type: String, required:true, enum: ['Restaurant', 'Pub', 'Bar', 'Club', 'private']},
    posts : [{ type: Schema.Types.ObjectId, ref: 'post' }]
});

module.exports = mongoose.model('locations', locationSchema);
