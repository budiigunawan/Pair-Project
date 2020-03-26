const express = require('express')
const route = express.Router()
const events = require('./eventsroute')
const userRoute = require('./userRoute')

route.get('/',(req,res)=>{
    res.render('home.ejs')
})

route.use('/events',events)
route.use('/users',userRoute)

module.exports = route