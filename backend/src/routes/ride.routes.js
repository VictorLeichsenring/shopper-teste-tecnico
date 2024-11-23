const route = require('express').Router()
const { RideController } = require('../controllers')

route.post('/estimate', RideController.estimate)

module.exports = route;