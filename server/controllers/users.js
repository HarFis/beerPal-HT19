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
        console.log("First");
        res.json({'users': users});
    });
});

// Return a list of all users with pagination
router.get('/', function(req, res, next) {
    console.log("Hej");
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query = {};
    console.log("skip ="+(size * (pageNo -1)));
    console.log("Hej");
    if (pageNo < 0 || pageNo === 0){
        return res.json('Page number can\'t be less than 1');
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    User.find({}, {}, query, function(err, users) {
        if (err) { return next(err); }
        res.json({'users': users});
    });
});

// Return a list of all user's posts
router.get('/:id/posts', function(req, res, next) {
    var id = req.params.id;
    Post.find({postOwner : id}).exec(function(err, posts) {
        if (err) { return next(err); }
        res.json({'posts': posts});
    });
});

// Return a list of all followed users
router.get('/:id/users', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        res.json(user.following);
    });
});

// Return a list of all users following a specific user
router.get('/followers/:id', function(req, res, next) {
    var id = req.params.id;
    User.find({following : id}, function(err, user) {
        if (err) { return next(err); }
        res.json({'Followers' : user});
    });
});


// Create a new user
router.post('/', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(user);
    });
});

// Return the user with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
});

// Replaces the user with the given ID
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndUpdate(id, req.body, 
        {overwrite : true, new : true}, function(err) {
        if (err){return next(err)}
        res.status(200).json({'message' : 'Updated Successfully'})
    });
});

//Updates the user with the given ID
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndUpdate(id, req.body, function(err) {
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
        res.json(user);
    });
});

module.exports = router;