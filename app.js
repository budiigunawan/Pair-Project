const express = require('express')
const route = require('./routes')
const app = express()
const port = 3000
const session = require("express-session");

let config = {
    secret: "corona got me feeling like"
  };

app.set('view engine','ejs')
app.use(session(config));
app.use(express.urlencoded({extended:true}))

app.use('/',route)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))