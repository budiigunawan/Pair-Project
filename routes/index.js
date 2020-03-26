<<<<<<< HEAD
const route = require('express').Router()
const Controller = require('../controllers')
const userRoute = require('./userRoute')

route.get('/',Controller.home)
route.use('/users',userRoute)
=======
const express = require('express')
const route = express.Router()
const events = require('./eventsroute')


route.get('/',(req,res)=>{
    res.render('home.ejs')
})


route.use('/events',events)



>>>>>>> ba30bdc8ee7faa1befbe7a340e83a53bf890e88e

module.exports = route