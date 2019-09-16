var express = require('express');
var router = express.Router();
var Brewery = require('../models/brewery');
var Beer = require('../models/beer');

//Return a list of all Breweries
router.get('/', function(req, res, next) {
    Brewery.find(function(err, breweries) {
        if (err) { return next(err); }
        res.json({'breweries': breweries});
    });
});

// Create a new Brewery
router.post('/', function(req, res, next) {
    var brewery = new Brewery(req.body);
    brewery.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(brewery);
    });
});

// Return the Brewery with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Brewery.findById(id, function(err, brewery) {
        if (err) { return next(err); }
        if (brewery === null) {
            return res.status(404).json({'message': 'Brewery not found'});
        }
        res.json(brewery);
    });
});



//Return all beers for a brewery
router.get('/:id/beers', function(req, res, next) {
    var id = req.params.id;
    Beer.find({brewery : id}).exec(function(err, beers) {
        if (err) { return next(err); }
        if (beers === null) {
            return res.status(404).json({'message': 'Beers not found'});
        }
        res.json(beers);
    });
});


// Delete the Brewery with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Brewery.findOneAndDelete({_id: id}, function(err, brewery) {
        if (err) { return next(err); }
        if (brewery === null) {
            return res.status(404).json({'message': 'Brewery not found'});
        }
        res.json(brewery);
    });
});

// Update the Brewery with the given idea
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Brewery.findById({_id: id}, function(err, brewery) {
        if (err) { return next(err); }
        if (brewery === null) {
            return res.status(404).json({'message': 'Brewery not found'});
        }
        brewery.name = req.body.name;
        brewery.avgRating = req.body.avgRating;
        brewery.adress = req.body.adress;
        brewery.link = req.body.link;
        brewery.save();
        res.json(brewery);
    });
});

// Partially update the brewery with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Brewery.findById({_id: id}, function(err, brewery) {
        if (err) { return next(err); }
        if (brewery === null) {
            return res.status(404).json({'message': 'Brewery not found'});
        }        
        brewery.name = (req.body.name || brewery.name);
        brewery.avgRating = (req.body.avgRating || brewery.avgRating);
        brewery.adress = (req.body.adress || brewery.adress);
        brewery.link = (req.body.link || brewery.link);
        brewery.save();
        res.json(brewery);
    });
});

module.exports = router;