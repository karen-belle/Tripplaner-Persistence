var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../../models')

var Activity = models.Activity;
var Day = models.Day;
var Place = models.Place;

router.get('/', function(req, res, next) {

    Activity.findAll({ include: Place })
        .then(function(activities) {
            res.json(activities);
        })
        .catch(next);
});

router.put('/', function(req, res, next) {
	Day.findById(+req.body.dayId)
	.then(function(day){
		Activity.findById(+req.body.activityId)
			.then(function (activity){
				day.addActivity(activity);
			})
	})
})

module.exports = router;
