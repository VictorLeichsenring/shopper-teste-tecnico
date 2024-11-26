const route = require('express').Router()
const { RideController } = require('../controllers')
const {validadeRideFields, validadeRideConfirm} = require('../middlewares/validateRideFields');

route.post('/estimate', validadeRideFields, RideController.estimate);
route.get('/', RideController.getAllRides);
route.patch('/confirm', validadeRideConfirm, RideController.confirmRide);


module.exports = route;