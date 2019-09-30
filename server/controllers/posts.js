var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');
var Location = require ('../models/location');
var Review = require ('../models/review');

// Return a list of all posts
router.get('/', function(req, res, next, ) {
    var sort = req.query.sort;
    console.log(sort)
    if(sort){next(); return;}
    Post.find({})
        .populate({
            path : 'review', 
        populate : {path : 'beer'}})
        .populate('location')
        .populate('postOwner', 'username')
        .exec(function(err, post)
         {
        if (err) { return next(err); }
        res.status(200).json(post);
    });
});

// Return a list of all posts, sorted
router.get('/', function(req, res, next, ) {
    console.log('got here')
    Post.find({})
        .sort({dateAndTime: -1})
        .populate({
        path : 'review', 
        populate : {path : 'beer'}})
        .populate('location')
        .populate('postOwner', 'username')
        .exec(function(err, post)
         {
        if (err) { return next(err); }
        res.status(200).json(post);
    });
});

// Return the post with the given ID
router.get('/:id', function(req, res, next) {
    console.log("HERE")
    var id = req.params.id;
    Post.findById(id)
        .populate('review')
        .populate('location')
        .populate('postOwner', 'username')
        .exec(function(err, post) {
        if (err) { return next(err); }
        if (post === null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.status(200).json(post);
    });
});


// Create a new post
router.post('/', (req, res, next) => {
    console.log(req.body.review)
    var post = new Post(req.body);    
    var userId = req.body.postOwner;
    User.findById(userId).then(user => {
        if (!user) {
            return res.status(404)
            .json({message: "postowner not found in DB"});
        }
    post.save(function(err) {  
        res.status(201).json(post)
        });
    });
});




// Replaces the post with the given ID
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if (!req.body.postOwner){
        return res.status(403)
        .json({'message': 'requires postowner'})
        }
    Post.findByIdAndUpdate(id, req.body, 
        {overwrite : true, new : true}, function(err) {
        if (req.body.postOwner == null){
            return res.status(400).json({'message': 'post need a postowner'})
        }    
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

// Dete all posts
router.delete('/', function(req, res, next){
    Post.deleteMany({}, function(err){
        if (err){return next(err)}
        res.status(200).json({'message' : 'deleted all posts'})
    })
});

// Delete the post with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Post.findOneAndDelete({_id : id}, function(err, user) {
        if (err) { return next(err); }
        if (Post === null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        res.status(200).json({'message': 'Deleted'});
    });
});

module.exports = router;