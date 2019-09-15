var express = require('express');
var router = express.Router();
var Review = require('../models/review');
var mongoose = require('mongoose')


// Create a new review
router.post('/', function(req, res, next) {
    var review = new Review({
        score: req.body.score,
        review: req.body.review,
    });
    review.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(review);
    });
});

// Return a list of all reviews
router.get('/', function(req, res, next) {
    Review.find(function(err, reviews) {
        if (err) { return next(err); }
        res.status(200).json({'Review': reviews});
    });
});

// Return the review with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findById(id, function(err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found'});
        }
        res.status(200).json(review);
    });
});

// Update (partially) a review with the given ID
router.patch('/:id', function (req,res,next){
    var id = req.params.id;
    Review.findByIdAndUpdate({_id: id}, { $set: req.body}, function(err,review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found'});
        }
        res.status.json(review); 
    });
});

// Update (completely) a review with the given ID 
// TODO: change to real PUT
router.put('/:id', function (req,res,next){
    var id = req.params.id;
    Review.findById({_id: id}, { $set: req.body}, function(err,review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found'});
        }
        res.json(review); 
    });
});

// Delete the review with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findOneAndDelete({_id: id}, function(err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found'});
        }
        res.json(review);
    });
});

module.exports = router;
