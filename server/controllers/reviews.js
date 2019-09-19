var express = require('express');
var router = express.Router();
var Review = require('../models/review');
var mongoose = require('mongoose');
var Beer = require('../models/beer');

function setAverageScore(id, req, res){
    //console.log("in the function average");
    Review.find({beer : id}).exec(function (err, reviews){
        if (err) { return next(err); }
        //console.log(reviews); Prints all reviews of chosen beer
        if (!reviews.length) {
            return res.status(404).json({'message': 'Beer reviews not found'});
        }
        var totalScores = 0;
        for(var i = 0; i < reviews.length; i++){
            totalScores += reviews[i].score;
        }
        var avgScore = (totalScores/reviews.length);
        console.log("average score " + avgScore);
        
        Beer.findById({ _id: id }, function (err, beer) {
            if (err) { return next(err); }
            beer.averageRating = avgScore;
            beer.save();
        });
    });
 }

// Create a new review
router.post('/', (req, res, next) => {
    var beer_id = req.body.beerID;
    if( !mongoose.Types.ObjectId.isValid(beer_id) ){
        return res.status(404).json({message: "Beer not found in DB"}); // They didn't send an object ID
      }
    Beer.findById(beer_id).then(beer => {
        if (!beer) {
            return res.status(404).json({
                message: "Beer not found in DB"
            });
        }
        var review = new Review({
            beer: req.body.beerID,
            score: req.body.score,
            textReview: req.body.textReview,
        });
        return review.save();
        //getAverageScore(beer_id, req, res);
        /*average = getAverageScore(beer_id, req, res);
        console.log("In post " +average);
        Beer.findByIdAndUpdate( beer_id,
            {$push : {'averageRating': average}})*/
    })
    .then(setAverageScore(beer_id, req, res))
    .then(result => {
        res.status(201).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// Return a list of all reviews
router.get('/', function (req, res, next) {
    Review.find()
        .populate('beer')
        .exec()
        .then(review => {
            res.status(200).json({ review });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// Return the review with the given ID
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Review not found"}); // They didn't send an object ID
      }
    Review.findById(id)
        .populate('beer')
        .exec()
        .then(review => {
            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }
            res.status(200).json({ review });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// Update (partially) a review with the given ID
router.patch('/:id', function (req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Review not found"}); // They didn't send an object ID
      }
    Review.findById({ _id: id }, function (err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({ 'message': 'Review not found' });
        }
        review.score = (req.body.score || review.score);
        review.textReview = (req.body.textReview || review.textReview);
        review.beer = (req.body.beer || review.beer);
        review.created = (req.body.created || review.created);
        review.save();
        res.json(review);
    });
});

// Bulk (PATCH) update all info to same
router.patch('/', function (req, res, next) {
    var id = req.params.id;
    Review.find(function (err, reviews) {
        if (err) { return next(err); }
        if (reviews === null) {
            return res.status(404).json({ 'message': 'Review not found' });
        }
        for(var i = 0; i>reviews.length; i++)
        {review[i].score = (req.body.score|| review.score);
        review[i].textReview = (req.body.textReview|| review.textReview);
        review[i].beer = (req.body.beer|| review.beer);
        review[i].created = (req.body.created|| review.created);
        review[i].save();}
        res.json(review);
    });
});

// Update (completely) a review with the given ID 
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Review not found"}); // They didn't send an object ID
      }
    Review.findById({ _id: id }, function (err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({ 'message': 'Review not found' });
        }
        review.score = req.body.score;
        review.textReview = req.body.textReview;
        review.beer = req.body.beerID;
        review.created = req.body.created;
        review.save(function (err) {
            if (err) { return next(err); }
            res.status(200).json(review);
        });
    });
});

// Bulk (PUT) update all info to same NOT USED
/*router.put('/', function (req, res, next) {
    var id = req.params.id;
    Review.find(function (err, reviews) {
        if (err) { return next(err); }
        if (reviews === null) {
            return res.status(404).json({ 'message': 'Review not found' });
        }
        for(var i = 0; i>reviews.length; i++)
        {review[i].score = (req.body.score);
        review[i].textReview = (req.body.textReview);
        review[i].beer = (req.body.beer);
        review[i].created = (req.body.created);
        review[i].save();}
        res.json(review);
    });
});*/

// Delete the review with the given ID
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Review not found"}); // They didn't send an object ID
      }
    Review.findOneAndDelete({ _id: id }, function (err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({ 'message': 'Review not found' });
        }
        res.json(review);
    });
});

// Delete all reviews
router.delete('/', function (req, res, next) {
    Review.collection.remove(function (err, review) {
        if (err) { return next(err); }
        res.json(review);
    });
});



module.exports = router;
