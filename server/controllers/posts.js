var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');
var Location = require ('../models/location');
var Review = require ('../models/review');

// Return a list of all posts
router.get('/', function(req, res, next, ) {
    var populateUsers = ({path: 'users', select: 'username'});
    Post.find({})
        .populate('reviews')
        .populate('locations')
        .populate(populateUsers).exec
        (function(err, post)
         {
        if (err) { return next(err); }
        res.json(post);
    });
});


// Create a new post
router.post('/', function(req, res, next) {
    var post = new Post(req.body);
    console.log(post);
    var userId = post.param.postOwner;
    console.log(userId);
    post.save(function(err) {
        if (err) { return next(err);
         };
         User.findByIdAndUpdate(
             userId,
             {$push : {"posts": post._id}}
         ).populate('posts')
        res.status(201).json(post);
    });
});


// Return the post with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var populateOwner = ({path: 'users', select: 'username'});
    Post.findById
    .populate('reviews')
    .populate('locations')
    .populate(populateOwner)(id, function(err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json(user);
    });
});

// Replaces the post with the given ID
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findByIdAndUpdate(id, req.body, 
        {overwrite : true, new : true}, function(err) {
        if (err){return next(err)}
        res.status(200).json({'message' : 'Updated Successfully'})
    });
});

//Updates the post with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findByIdAndUpdate(id, req.body, function(err) {
        if (err){return next(err)}
        res.status(200).json({'message' : 'Updated Successfully'})
    });
});

// Delete the post with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.json(post);
    });
});

module.exports = router;