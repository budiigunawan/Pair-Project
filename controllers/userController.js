const {User} = require('../models')

class UserController {
    static list(req,res) {
        User.findAll({})
        .then(data=>{
            res.render('userList',{data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static form(req,res) {
        res.render('userForm.ejs')
    }

    static create(req,res) {
        User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role : req.body.role
        })
        .then(data=>{
            res.redirect('/users')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static editForm(req,res) {
        User.findByPk(req.params.id)
        .then(data=>{
            res.render('userEdit',{data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static update(req,res) {
        User.update({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role
        },{
            where: {
                id: Number(req.params.id)
            }
        })
        .then(data=>{
            res.redirect('/users')
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static destroy(req,res){
        User.destroy({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(data => {
            res.redirect('/users')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = UserController