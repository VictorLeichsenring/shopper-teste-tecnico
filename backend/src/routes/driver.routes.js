const route = require('express').Router()
const {DriverController} = require('../controllers')

route.get('/', DriverController.getAll)


module.exports = route;