var express = require('express');
var router = express.Router();
var Brewery = require('../models/brewery');
var Beer = require('../models/beer');
var mongoose = require('mongoose');

/*------------
-----GET------
------------*/

//Return a list of all Breweries
router.get('/', function(req, res, next) {
    Brewery.find(function(err, breweries) {
        if (err) { return next(err); }
        res.json({'breweries': breweries});
    });
});

// Return the Brewery with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Brewery not found"}); // They didn't send an object ID
    }
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
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Brewery not found"}); // They didn't send an object ID
    }
    Beer.find({brewery : id}).exec(function(err, beers) {
        if (err) { return next(err); }
        if (beers === null) {
            return res.status(404).json({'message': 'Beers not found'});
        }
        res.json({'beers' : beers});
    });
});

/*------------
-----POST-----
------------*/

// Create a new Brewery
router.post('/', function(req, res, next) {
    var brewery = new Brewery(req.body);
    brewery.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(brewery);
    });
});

/*------------
---DELETE-----
------------*/

// Delete the Brewery with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Brewery not found"}); // They didn't send an object ID
    }
    Brewery.findOneAndDelete({_id: id}, function(err, brewery) {
        if (err) { return next(err); }
        if (brewery === null) {
            return res.status(404).json({'message': 'Brewery not found'});
        }
        res.json(brewery);
    });
});

//Delete 
router.delete('/:brewery_id/beers/:beer_id', function(req, res, next){
    var beerId = req.params.beer_id;
    var breweryId = req.params.brewery_id;

    if( !mongoose.Types.ObjectId.isValid(breweryId) ){
        return res.status(404).json({message: "Brewery not found"}); // They didn't send an object ID
    }
    if( !mongoose.Types.ObjectId.isValid(beerId) ){
        return res.status(404).json({message: "Beer not found"}); // They didn't send an object ID
    }
    
    Brewery.findById(breweryId, function(err, brewery){
        if (err) { return next(err); }
        if (brewery === null) {
            return res.status(404).json({'message': 'Brewery not found'});
        }
        Beer.findOneAndDelete({_id : beerId}, function(err, beer){
            if (err) { return next(err); }
            if (beer === null) {
                return res.status(404).json({'message': 'Beer not found'});
            }
            res.json(beer);
        });
    });
});

/*------------
-----PUT------
------------*/

// Update the Brewery with the given idea
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Brewery not found"}); // They didn't send an object ID
    }
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

/*------------
----PATCH-----
------------*/

// Partially update the brewery with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Brewery not found"}); // They didn't send an object ID
    }
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