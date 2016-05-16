var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../../models')
var Hotel = models.Hotel;

var Place = models.Place;


router.get('/', function(req, res, next) {

    Hotel.findAll({ include: Place })
        .then(function(hotels) {
            res.json(hotels);
        })
        .catch(next);
});



module.exports = router;
