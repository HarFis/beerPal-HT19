var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post')

// Return a list of all users
router.get('/', function(req, res, next) {
    var pageNo = req.query.pageNo;
    if(pageNo){next(); return;}
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.status(200).json({'users': users});
    });
});

// Return a list of all users with pagination
router.get('/', function(req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query = {};
    if (pageNo < 0 || pageNo === 0){
        return res.json('Page number can\'t be less than 1');
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    User.find({}, {}, query, function(err, users) {
        if (err) { return next(err); }
        res.status(200).json({'users': users});
    });
});

// Return a list of all user's posts
router.get('/:id/posts', function(req, res, next) {
    var id = req.params.id;
    Post.find({postOwner: id})
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

// Return a list of a post belonging a specific user
router.get('/:userId/posts/:postId', function(req, res, next) {
    var userId = req.params.userId;
    var postId = req.params.postId;
    Post.find({postOwner : userId}).exec(function(err, posts) {
        if (err) { return next(err); }
        Post.findById(postId).exec(function(err, post){
            if (err) { return next(err); }
        res.status(200).json(post);
        });
    });
});

// Return a list of all followed users
router.get('/:id/users', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        res.status(200).json(user.following);
    });
});

// Return a list of all users following a specific user
router.get('/followers/:id', function(req, res, next) {
    var id = req.params.id;
    User.find({following : id}, function(err, user) {
        if (err) { return next(err); }
        res.status(200).json({'Followers' : user});
    });
});


// Create a new user
router.post('/', function(req, res, next) {
    var user = new User(req.body);
    /*if(User.findOne({user: user})!=true){
        return res.status(403)
        .json({'message' : 'A user with this username already exists'});
    }*/
    user.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    });
});

// Return the user with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id)
    .populate('post')
    .exec(function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.status(200).json(user);
    });
});

// Replaces the user with the given ID
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndUpdate(id, req.body, 
        {overwrite : true, new : true},
        //{runValidators:true, context: query}, 
        function(err) { //Checks the "unique and required", might not work
        if (err){return next(err)}
        res.status(200).json({'message' : 'Updated Successfully'})
    });
});

//Updates the user with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndUpdate(id, req.body, 
        //{runValidators:true, context: query}, 
        function(err) { //Checks the "unique and required", might not work    
        if (err){return next(err)}
        res.status(200).json({'message' : 'Updated Successfully'})
    });
});

// Delete the user with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        Post.deleteMany({postOwner: id}, function(err, post){
            if (err) {return next(err)}
        })
        res.status(200).json('user deleted');
    });
});

module.exports = router;