const express = require('express')
const route = express.Router()
const events = require('./eventsroute')


route.get('/',(req,res)=>{
    res.render('home.ejs')
})


route.use('/events',events)




module.exports = route