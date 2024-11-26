const route = require('express').Router()
const { RideController } = require('../controllers')
const {validadeRideFields, validadeRideConfirm, validadeRideByCustomerId} = require('../middlewares/validateRideFields');

route.post('/estimate', validadeRideFields, RideController.estimate);
// route.get('/', RideController.getAllRides);
route.patch('/confirm', validadeRideConfirm, RideController.confirmRide);
route.get('/:customer_id/:driver_id?', validadeRideByCustomerId, RideController.getByCustomerId);


module.exports = route;