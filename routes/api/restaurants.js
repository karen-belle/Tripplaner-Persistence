var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../../models')

var Restaurant = models.Restaurant;
var Day = models.Day;
var Place = models.Place;


router.get('/', function(req, res, next) {
    Restaurant.findAll({ include: Place })
        .then(function(restaurants) {
            res.json(restaurants);
        })
        .catch(next);
});
router.put('/', function(req, res, next) {
	Day.findById(+req.body.dayId)
	.then(function(day){
		Restaurant.findById(+req.body.restaurantId)
			.then(function (restaurant){
				day.addRestaurant(restaurant);
			})
	})
})


module.exports = router;
