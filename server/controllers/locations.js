var express = require('express');
var router = express.Router();
var Location = require('../models/location');
var mongoose = require('mongoose');


// Create a new location
router.post('/', function(req, res, next) {
    var location = new Location({
        name: req.body.name,
        typeOfLocation: req.body.typeOfLocation
    });
    location.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(location);
    });
});

// Return a list of all locations
router.get('/', function(req, res, next) {
    Location.find(function(err, locations) {
        if (err) { return next(err); }
        res.status(200).json({'locations': locations});
    });
});

// Return the location with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({'message': "Location not found"}); // They didn't send an object ID
      }
    Location.findById(id, function(err, location) {
        if (err) { return next(err); }
        if (location === null) {
            return res.status(404).json({'message': 'Location not found'});
        }
        res.status(200).json(location);
    });
});

// PATCH Update (partially) a location with the given ID
router.patch('/:id', function (req,res,next){
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({'message': "Location not found"}); // They didn't send an object ID
      }
    Location.findById({_id: id}, function(err,location) {
        if (err) { return next(err); }
        if (location === null) {
            return res.status(404).json({'message': 'Location not found'});
        }
        location.name = (req.body.name || location.name);
        location.typeOfLocation = (req.body.typeOfLocation || location.typeOfLocation);
        location.save();
        res.json(location); 
    });
});

// Bulk (PATCH) update all info to same
router.patch('/', function (req, res, next) {
    var id = req.params.id;
    Location.find(function (err, locations) {
        if (err) { return next(err); }
        if (location === null) {
            return res.status(404).json({ 'message': 'Location not found' });
        }
        for(var i = 0; i>locations.length; i++)
        {location[i].name = (req.body.name|| location.name);
        location[i].typeOfLocation = (req.body.typeOfLocation|| location.typeOfLocation);
        location[i].save();}
        res.json(location);
    });
});

// PUT Update (completely) a location with the given ID 
router.put('/:id', function (req,res,next){
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({'message': "Location not found"}); // They didn't send an object ID
      }
    Location.findById({_id: id}, function(err,location) {
        if (err) { return next(err); }
        if (location === null) {
            return res.status(404).json({'message': 'Location not found'});
        }
        location.name = req.body.name;
        location.typeOfLocation = req.body.typeOfLocation;
    
        location.save(function(err) {
        if (err) { return next(err); }
        res.status(200).json(location);
    });
    });
});

// Delete the location with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({'message': "Location not found"}); // didn't send an object ID
      }
    Location.findOneAndDelete({_id: id}, function(err, location) {
        if (err) { return next(err); }
        if (location === null) {
            return res.status(404).json({'message': 'Location not found'});
        }
        res.json(location);
    });
});

// Delete all locations
router.delete('/', function (req, res, next) {
    Location.collection.remove(function (err, location) {
        if (err) { return next(err); }
        res.json(location);
    });
});

module.exports = router;
