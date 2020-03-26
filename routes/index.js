const express = require('express')
const route = express.Router()
const events = require('./eventsroute')
const userRoute = require('./userRoute')
const ControllerUser = require('../controllers/userController')
const ctr =require ('../controllers/index')
const authentication = require("../middlewares/log");



// route.get('/',(req,res)=>{
//     res.render('home.ejs')
// })
// route.get('/sign-up',ctrlUser.form)
// route.post('/sign-up',ctrlUser.create)

// route.use('/events',events)
// route.use('/users',userRoute)



route.get("/", ctr.home);

route.post("/", ctr.login);
route.get("/logout", ctr.logout);

route.get("/sign-up", ControllerUser.form);
route.post("/sign-up", ControllerUser.create);

route.use(authentication);

route.use("/events", events);
route.use("/users", userRoute);



module.exports = route