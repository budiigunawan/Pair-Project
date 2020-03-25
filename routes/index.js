const route = require('express').Router()
const Controller = require('../controllers')
const userRoute = require('./userRoute')

route.get('/',Controller.home)
route.use('/users',userRoute)

module.exports = route