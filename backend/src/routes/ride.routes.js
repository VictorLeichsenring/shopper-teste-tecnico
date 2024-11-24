const route = require('express').Router()
const { RideController } = require('../controllers')
const validadeRideFields = require('../middlewares/validateRideFields');

route.post('/estimate', validadeRideFields, RideController.estimate);


module.exports = route;