const route = require('express').Router()
const { RideController } = require('../controllers')
const validadeRideFields = require('../middlewares/validateRideFields');

route.post('/estimate', validadeRideFields, RideController.estimate);
route.get('/', RideController.getAllRides);


module.exports = route;