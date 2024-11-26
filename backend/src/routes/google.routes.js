const route = require('express').Router()
const { GoogleController } = require('../controllers')

route.post('/', GoogleController.findRoute)

module.exports = route;