var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');
var Location = require('../models/location');
var Review = require('../models/review');

// Return a list of all posts
router.get('/', function (req, res, next, ) {
    var sort = req.query.sort;
    var count = req.query.count;
<<<<<<< HEAD
    console.log(sort)
    if (sort || count) { next(); return; }
=======
    if (sort|| count) { next(); return; }
>>>>>>> e7187cf573f0320db59c2f6e4581f8783ad1233e
    Post.find({})
        .populate({
            path: 'review',
            populate: { path: 'beer', populate: { path: 'brewery' } }
        })
        .populate('location')
        .populate('postOwner', 'username')
        .exec(function (err, post) {
            if (err) { return next(err); }
            res.status(200).json(post);
        });
});

// Return a list of all posts, sorted with pagination
router.get('/', function (req, res, next, ) {
    var count = req.query.count
    var pageNo = req.query.pageNo
    var sort = req.query.sort
    var size = 5
    var query = {}
    if ((sort && !pageNo) || count) { next(); return; }
    if (pageNo < 0 || pageNo === 0) {
        return res.json('Page number can\'t be less than 1');
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    Post.find({}, {}, query)
        .sort({ dateAndTime: -1 })
        .populate({
            path: 'review',
            populate: { path: 'beer', populate: { path: 'brewery' } }
        })
        .populate('location')
        .populate('postOwner', 'username')
        .exec(function (err, post) {
            if (err) { return next(err); }
            res.status(200).json(post);
        });
});

// Return a list of all posts, sorted
router.get('/', function (req, res, next, ) {
    var count = req.query.count
    if (count) { next(); return; }

    Post.find({})
        .sort({ dateAndTime: -1 })
        .populate({
            path: 'review',
            populate: { path: 'beer', populate: { path: 'brewery' } }
        })
        .populate('location')
        .populate('postOwner', 'username')
        .exec(function (err, post) {
            if (err) { return next(err); }
            res.status(200).json(post);
        });
});

//Return the number of posts
router.get('/', function (req, res, next) {
    Post.countDocuments({}, function (err, count) {
        res.json(count);
    })
})


// Return the post with the given ID
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Post.findOne({_id: id})
    .populate({
        path: 'review',
        populate: { path: 'beer', populate: { path: 'brewery' } }
    })
        .populate('location')
        .populate('postOwner', 'username')
        .exec(function (err, post) {
            if (err) { return next(err); }
            if (post === null) {
                return res.status(404).json({ 'message': 'Post not found' });
            }
            res.status(200).json(post);
        });
});


// Create a new post
router.post('/', (req, res, next) => {
    var post = new Post({
        review: req.body.review,
        location: req.body.location,
        dateAndTime: new Date(),
        postOwner: req.body.postOwner
    });
    var userId = req.body.postOwner;
    User.findById(userId).then(user => {
        if (!user) {
            return res.status(404)
                .json({ message: "postowner not found in DB" });
        }
        post.save(function (err) {
            res.status(201).json(post)
        });
    });
});




// Replaces the post with the given ID
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    if (!req.body.postOwner) {
        return res.status(403)
            .json({ 'message': 'requires postowner' })
    }
    Post.findByIdAndUpdate(id, req.body,
        { overwrite: true, new: true }, function (err) {
            if (req.body.postOwner == null) {
                return res.status(400).json({ 'message': 'post need a postowner' })
            }
            if (err) { return next(err) }
            res.status(200).json({ 'message': 'Updated Successfully' })
        });
});

//Updates the post with the given ID
router.patch('/:id', function (req, res, next) {
    var id = req.params.id;
    Post.findByIdAndUpdate(id, req.body, function (err) {
        if (err) { return next(err) }
        res.status(200).json({ 'message': 'Updated Successfully' })
    });
});

// Dete all posts
router.delete('/', function (req, res, next) {
    Post.deleteMany({}, function (err) {
        if (err) { return next(err) }
        res.status(200).json({ 'message': 'deleted all posts' })
    })
});

// Delete the post with the given ID
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    Post.findOneAndDelete({ _id: id }, function (err, user) {
        if (err) { return next(err); }
        if (Post === null) {
            return res.status(404).json({ 'message': 'Post not found' });
        }
        res.status(200).json({ 'message': 'Deleted' });
    });
});

module.exports = router;