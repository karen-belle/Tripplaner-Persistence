var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../../models')

var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Place = models.Place;

var Day = models.Day;

router.get('/', function(req, res, next) {
    console.log('hey0');
    Day.findAll()
        .then(function(days) {
            console.log("here is day");
            res.json(days);
        })
        .catch(next);
});

router.post('/', function(req, res, next) {
    var num = Number(req.body.index)
    Day.create({ number: num })
        .then(function(dayCreated) {
            res.json(dayCreated);
        })
});

router.put('/hotel', function(req, res, next) {
    console.log("Day ID ", req.body.dayId);
    Day.findById(+req.body.dayId)
        .then(function(day) {
            day.update({ hotelId: +req.body.hotelId })
                .then(function(dayCreated) {
                    res.json(dayCreated);
                    console.log("Updated day: ", dayCreated);
                })
        })

});

// router.post('/:id/hotels', function(req, res, next) {
//     console.log('hey');
// })
// router.post('/:id/restaurants', function(req, res, next) {
//     console.log('hey1');
// })
// router.post('/:id/activities', function(req, res, next) {
//     console.log('hey2');
// })

module.exports = router;
