const express = require('express')
const app = express()
const port = 3000
<<<<<<< HEAD

=======
>>>>>>> ba30bdc8ee7faa1befbe7a340e83a53bf890e88e
const route = require('./routes')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

app.use('/',route)

<<<<<<< HEAD
app.listen(port, ()=>{
    console.log('This application is running on port ',port)
})
=======

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
>>>>>>> ba30bdc8ee7faa1befbe7a340e83a53bf890e88e
