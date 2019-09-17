var express = require('express');
var router = express.Router();
var Review = require('../models/review');
var mongoose = require('mongoose')


// Create a new review
router.post('/', function(req, res, next) {
    var review = new Review({
        beer: req.body.beer,
        score: req.body.score,
        textReview: req.body.textReview,
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
    console.log("Inne in patch");
    Review.findById({_id: id}, function(err,review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found'});
        }
        review.score = (req.body.score || review.score);
        review.textReview = (req.body.textReview || review.textReview);
        review.beer = (req.body.beer || review.beer);
        review.created = (req.body.created || review.created);
        review.save();
        res.json(review); 
    });
});

// Update (completely) a review with the given ID 
router.put('/:id', function (req,res,next){
    var id = req.params.id;
    Review.findById({_id: id}, function(err,review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found'});
        }
        review.score = req.body.score;
        review.textReview = req.body.textReview;
        review.beer = req.body.beer;
        review.created = req.body.created;
        review.save(function(err) {
            if (err) { return next(err); }
            res.status(200).json(review);
        }); 
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
