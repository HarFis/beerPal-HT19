var express = require('express');
var router = express.Router();
var Beer = require('../models/beer');
var mongoose = require('mongoose');
var Review = require('../models/review')
var Brewery = require('../models/brewery')
var Post = require('../models/post')

/*------------
-----GET------
------------*/
//Return a list of all Beers
router.get('/', function(req, res, next) {
    var type = req.query.type;
    var sort = req.query.sort;
    if(type||sort){next(); return;};
    Beer.find({})
    .populate('brewery')
    .exec(function(err, beers) {
        if (err) { return next(err); }
        res.json({'beers': beers});
    });
});

//Return a list of all Beers with a given type
router.get('/', function(req, res, next) {
    var type = req.query.type;
    var sort = req.query.sort;
    if(sort){next(); return;}
    Beer.find({'type' : type})
    .populate('brewery', 'name')
    .exec(function(err, beers) {
        if (err) { return next(err); }
        if(!beers.length){ //Check if array beers is empty
            var message = "No beer found of type " + type;
            return res.status(404).json({'message': message});
        }
        res.json({'beers': beers});
    });
});

//Return a list of all Beers sorted by alcohol
router.get('/', function(req, res, next) {
    var sort = req.query.sort;
    if(sort.charAt(0) == '-'){
        Beer.find().sort({'alcohol' : -1})
        .populate('brewery', 'name')
        .exec(function(err, beers) {
            if (err) { return next(err); }
            res.json({'beers': beers});
        });
    }else{
        Beer.find().sort({'alcohol' : 1})
        .populate('brewery', 'name')
        .exec(function(err, beers) {
            if (err) { return next(err); }
            res.json({'beers': beers});
        });
    }
});

// Return the beer with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Beer not found"}); // They didn't send an object ID
    }
    Beer.findById(id)
    .populate('brewery')
    .exec(function(err, beer) {
        if (err) { return next(err); }
        if (beer === null) {
            return res.status(404).json({'message': 'Beer not found'});
        }
        res.json(beer);
    });
});

router.get('/:id/reviews', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Not found"}); // They didn't send an object ID
    }
    Review.find({beer: id})
        .populate('beer')
        .exec(function(err, reviews) {
        if (err) { return next(err); }
        if (reviews === null) {
            return res.status(404).json({'message': 'Not found'});
        }
        res.json({'reviews' : reviews});
    });
});

/*------------
-----POST-----
------------*/

// Create a new beer
router.post('/', function(req, res, next) {
    var beer = new Beer(req.body);
    beer.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(beer);
    });
});

/*// Create a review with a given BEER ID
router.post('/:id/reviews', function (req, res, next){
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Beer not found in DB"}); // They didn't send an object ID
      }
    Beer.findById(id, function (err, beer){
        if (err) { return next(err); }

        var review = new Review({
            beer: id,
            score: req.body.score,
            textReview: req.body.textReview,
        });
        review.save(function(err){
            if (err) { return next(err); }
        });
    });
});*/



/*------------
---DELETE-----
------------*/

// Delete all beers -> deletes all posts & posts
router.delete('/', function(req, res, next) {
    Beer.find().deleteMany().exec(function(err, beers) {
        if (err) { return next(err); }
        console.log("Beers deleted");
        res.json(beers)
    });
    Review.find().deleteMany().exec(function(err, reviews) {
        if (err) { return next(err); }
        console.log("Related comments deleted");
    });
    Post.find().deleteMany().exec(function(err, posts) {
        if (err) { return next(err); }
        console.log("Related posts deleted");
    });
});


// Delete the beer with the given ID & deletes related review(s) and post(s)
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Beer not found"}); 
    }
    Beer.findOneAndDelete({_id: id}, function(err, beer) {
        if (err) { return next(err); }
        if (beer === null) {
            return res.status(404).json({'message': 'Beer not found'});
        }
        res.json(beer);
    });
    Review.find({beer: id}, function(err, reviews){
    if (err) { return next(err); 
    } 
    for(var i = 0; i < reviews.length; i ++){
        var review_id = reviews[i]._id
        console.log(review_id)
        Post.findOneAndDelete({review: review_id}, function(err){
            if (err) { return next(err); 
            } });
        reviews[i].delete();
    }


});
});


/*------------
-----PUT------
------------*/

// Bulk update all beers with the given idea
router.put('/', function(req, res, next) {
    Beer.find(function(err, beers) {
        if (err) { return next(err); }
        if (beers === null) {
            return res.status(404).json({'message': 'Beers not found'});
        }
        for(var i = 0; i < beers.length; i ++){
            beers[i].name = req.body.name;
            beers[i].brewery = req.body.brewery;
            beers[i].type = req.body.type;
            beers[i].alcohol = req.body.alcohol;
            beers[i].averageRating = req.body.averageRating;
            beers[i].save();
        }
        res.json(beers);
    });
});

// Update the beer with the given id
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Beer not found"}); // They didn't send an object ID
    }
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

/*------------
-----PATCH----
------------*/

// Bulk partially update all beers
router.patch('/', function(req, res, next) {
    Beer.find(function(err, beers) {
        if (err) { return next(err); }
        if (beers === null) {
            return res.status(404).json({'message': 'Beers not found'});
        }
        for(var i = 0; i < beers.length; i ++){
            beers[i].name = (req.body.name || beers[i].name);
            beers[i].brewery = (req.body.brewery || beers[i].brewery);
            beers[i].type = (req.body.type || beers[i].type);
            beers[i].alcohol = (req.body.alcohol || beers[i].alcohol);
            beers[i].averageRating = (req.body.averageRating || beers[i].averageRating);
            beers[i].save();
        }
        res.json(beers);
    });
});

// Partially update the beer with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Beer not found"}); // They didn't send an object ID
    }
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

//Create a new review through beer
// DO NOT USE, just for Milestone 1, does not update average score!!
router.post('/:id/reviews', function (req, res, next){
    var id = req.params.id;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({message: "Beer not found in DB"}); // They didn't send an object ID
      }
    Beer.findById(id, function (err, beer){
        if (err) { return next(err); }
        console.log("after error");
        if (!beer) {
            return res.status(404).json({
                message: "Beer not found in DB"
            });
        }
        var review = new Review({
            beer: req.params.id,
            score: req.body.score,
            textReview: req.body.textReview
        });
        console.log(review);
        review.save(function(err) {
            if (err) { return next(err); }
            res.status(201).json(review);
        });
    });
});

// Export router
module.exports = router;