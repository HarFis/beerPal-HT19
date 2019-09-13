var express = require('express');
var router = express.Router();
var Location = require('../models/location');

// Return a list of all locations
router.get('/', function(req, res, next) {
    Location.find(function(err, locations) {
        if (err) { return next(err); }
        res.json({'location': locations});
    });
});

// Create a new location
router.post('/', function(req, res, next) {
    var location = new Location(req.body);
    location.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(location);
    });
});

// Return the location with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Location.findById(id, function(err, location) {
        if (err) { return next(err); }
        if (location === null) {
            return res.status(404).json({'message': 'Location not found'});
        }
        res.json(location);
    });
});

// Delete the location with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Location.findOneAndDelete({_id: id}, function(err, location) {
        if (err) { return next(err); }
        if (location === null) {
            return res.status(404).json({'message': 'Location not found'});
        }
        res.json(location);
    });
});

module.exports = router;
