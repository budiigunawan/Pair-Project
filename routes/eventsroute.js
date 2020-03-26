const express = require('express')
const route = express.Router()
const controller = require('../controllers/eventscontroller')

route.get('/',controller.list)
route.get('/add',controller.addform)
route.post('/add',controller.addpost)

route.get('/:id/delete',controller.delete)

route.get('/:id/edit',controller.editform)
route.post('/:id/edit',controller.editpost)

route.get('/:id/info',controller.info)
module.exports = route