var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Return a list of all users
router.get('/', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.json({'users': users});
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

// Delete the user with the given ID
router.delete('/:id', function(req, res, next) {
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
});

module.exports = router;