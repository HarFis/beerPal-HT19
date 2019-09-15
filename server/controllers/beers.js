var express = require('express');
var router = express.Router();
var Beer = require('../models/beer');


//Return a list of all Beers
router.get('/', function(req, res, next) {
    Beer.find(function(err, beers) {
        if (err) { return next(err); }
        res.json({'beers': beers});
    });
});

// Create a new beer
router.post('/', function(req, res, next) {
    var beer = new Beer(req.body);
    beer.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(beer);
    });
});

// Return the beer with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Beer.findById(id, function(err, beer) {
        if (err) { return next(err); }
        if (beer === null) {
            return res.status(404).json({'message': 'Beer not found'});
        }
        res.json(beer);
    });
});

// Delete the beer with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Beer.findOneAndDelete({_id: id}, function(err, beer) {
        if (err) { return next(err); }
        if (beer === null) {
            return res.status(404).json({'message': 'Beer not found'});
        }
        res.json(beer);
    });
});

// Update the beer with the given idea
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Beer.findById({_id: id}, function(err, beer) {
        if (err) { return next(err); }
        if (beer === null) {
            return res.status(404).json({'message': 'Beer not found'});
        }
        beer.name = req.body.name;
        beer.brewery = req.body.brewery;
        beer.type = req.body.type;
        beer.alcohol = req.body.alcohol;
        beer.averageRating = req.body.averageRating;
        beer.save();
        res.json(beer);
    });
});

// Partially update the camel with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Beer.findById({_id: id}, function(err, beer) {
        if (err) { return next(err); }
        if (beer === null) {
            return res.status(404).json({'message': 'Beer not found'});
        }
        beer.name = (req.body.name || beer.name);
        beer.brewery = (req.body.brewery || beer.brewery);
        beer.type = (req.body.type || beer.type);
        beer.alcohol = (req.body.alcohol || beer.alcohol);
        beer.averageRating = (req.body.averageRating || beer.averageRating);
        beer.save();
        res.json(beer);
    });
});

module.exports = router;