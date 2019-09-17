var express = require('express');
var router = express.Router();
var Beer = require('../models/beer');

/*------------
-----GET------
------------*/
//Return a list of all Beers
router.get('/', function(req, res, next) {
    var type = req.query.type;
    var sort = req.query.sort;
    if(type||sort){next(); return;};
    Beer.find(function(err, beers) {
        if (err) { return next(err); }
        res.json({'beers': beers});
    });
});

//Return a list of all Beers with a given type
router.get('/', function(req, res, next) {
    var type = req.query.type;
    var sort = req.query.sort;
    if(sort){next(); return;}
    Beer.find({'type' : type}).exec(function(err, beers) {
        if (err) { return next(err); }
        res.json({'beers': beers});
    });
});

//Return a list of all Beers sorted by alcohol
router.get('/', function(req, res, next) {
    var sort = req.query.sort;
    if(sort.charAt(0) == '-'){
        Beer.find().sort({'alcohol' : -1}).exec(function(err, beers) {
            if (err) { return next(err); }
            res.json({'beers': beers});
        });
    }else{
        Beer.find().sort({'alcohol' : 1}).exec(function(err, beers) {
            if (err) { return next(err); }
            res.json({'beers': beers});
        });
    }
});

// Return the beer with the given ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Beer.findById(id, function(err, beer) {
        if (err) { return next(err); }
        if (beer === null) {
            return res.status(404).json({'message': 'Beer not found'});
        }
        res.json(beer);
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

/*------------
---DELETE-----
------------*/

// Delete all beers
router.delete('/', function(req, res, next) {
    Beer.find().remove().exec(function(err, beers) {
        if (err) { return next(err); }
        if (beers === null) {
            return res.status(404).json({'message': 'Beers not found'});
        }
        res.json(beers);
    });
});

// Delete the beer with the given ID
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Beer.findOneAndDelete({_id: id}, function(err, beer) {
        if (err) { return next(err); }
        if (beer === null) {
            return res.status(404).json({'message': 'Beer not found'});
        }
        res.json(beer);
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

// Update the beer with the given idea
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
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



// Export router
module.exports = router;