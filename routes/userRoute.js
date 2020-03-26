const route = require('express').Router()
const Controller = require('../controllers/userController')


route.get("/", Controller.myPage);
route.get("/settings", Controller.editPage);
route.post("/settings", Controller.editPagePost);

route.get("/:id/remove",Controller.removeEvent)





route.get("/secretcoronalist", Controller.list);



//route.get('/',Controller.list)

// route.get('/sign-up',Controller.form)
// route.post('/sign-up',Controller.create)

// route.get('/edit/:id',Controller.editForm)
// route.post('/edit/:id',Controller.update)

route.get('/delete/:id',Controller.destroy)

module.exports = route