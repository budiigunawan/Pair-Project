const {Event,User, User_Event} = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op


class EventCtrl{

    static list(req,res){
        Event.findAll({order:[['event_date','DESC']]})
        .then(data=>{
            if (req.query.event_name) {
                EventCtrl.search(req,res)
            } else {
                res.render('events.ejs', {data})
            }
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addform(req,res){
        res.render('addevents.ejs')
    }

    static addpost(req,res){
        let obj = {
            event_name: req.body.name,
            event_date: req.body.time,
            description: req.body.desc
        }
        //Event.create(obj,{})
        
        Promise.all([Event.create(obj,{}),User.findOne({ where: { username: req.session.user }})])
        .then(data=>{
            let event = data[0]
            let user = data[1]
            let ids = {
                UserId: user.id,
                EventId: event.id
            }
            return User_Event.create(ids,{})
        }).then(data=>{
            res.redirect('/users')
        }).catch(err=>{
            res.send(err)
        })

    }

    static delete(req,res){
        Event.destroy({where:{id: req.params.id}})
        .then(data=>{
            return User_Event.destroy({where:{EventId: req.params.id}})
        }).then(data=>{
            res.redirect('/users')
        }).catch(err=>{
            res.send(err)
        })
    }

    static editform(req,res){
        Event.findByPk(req.params.id)
        .then(data=>{
            console.log(data)
            let date = JSON.stringify(data.event_date).slice(1,17)
            res.render('editevents.ejs',{data, date})
        }).catch(err=>{
            res.send(err)
        })
    }

    static editpost(req,res){
        let values={
            event_name: req.body.name,
            event_date: req.body.time,
            description: req.body.desc
        }
        Event.update(values,{where:{id:req.params.id}})
        .then(data=>{
            res.redirect('/users')
        }).catch(err=>{
            res.send(err)
        })
    }


    static info(req,res){
        Promise.all([Event.findByPk(req.params.id),User.findOne({where: { username: req.session.user }})])
        .then(data=>{
            res.render('info.ejs',{data:data[0], user:data[1]})
        }).catch(err=>{
            res.send(err)
        })


        // Event.findByPk(req.params.id)
        // .then(data=>{
        //     res.render('info.ejs',{data})
        // }).catch(err=>{
        //     res.send(err)
        // })
    }

    static search(req,res) {
        Event.findAll({
            where: {
                event_name: {
                  [Op.like]: `%${req.query.event_name}%`
                }
              }
        })
        .then(data=>{
            res.render('events.ejs', {data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addToUser(req,res){
        User.findOne({
            where: { username: req.session.user }
          }).then(data => {
              let obj={
                  UserId: data.id,
                  EventId: req.params.id
              }
              return User_Event.create(obj,{})
          }).then(data=>{
              res.redirect('/users')
          }).catch(err=>{
              res.send(err)
          })
    }

}


module.exports = EventCtrl