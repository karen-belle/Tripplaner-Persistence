var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../models')
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Place = models.Place;
var Day = models.Day;


router.get('/', function (req, res, next) {
  Promise.all([
    Hotel.findAll({include: Place}),
    Restaurant.findAll({include: Place}),
    Activity.findAll({include: Place})
  ])
  .spread(function (hotels, restaurants, activities) {
    res.render('index', {
      hotels: hotels,
      restaurants: restaurants,
      activities: activities
    });
  })
  .catch(next);
});

router.use('/api/restaurants', require('./api/restaurants'));
router.use('/api/hotels', require('./api/hotels'));
router.use('/api/activities', require('./api/activities'));
router.use('/api/days', require('./api/days'));


module.exports = router;
