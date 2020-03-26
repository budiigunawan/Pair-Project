const {Event,User, User_Event} = require('../models')

class EventCtrl{

    static list(req,res){
        Event.findAll({})
        .then(data=>{
            res.render('events.ejs', {data})
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
        Event.create(obj,{})
        .then(data=>{
            res.redirect('/events')
        }).catch(err=>{
            res.send(err)
        })
    }

    static delete(req,res){
        Event.destroy({where:{id: req.params.id}})
        .then(data=>{
            res.redirect('/events')
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
            res.redirect('/events')
        }).catch(err=>{
            res.send(err)
        })
    }


    static info(req,res){
        Event.findByPk(req.params.id)
        .then(data=>{
            res.render('info.ejs',{data})
        }).catch(err=>{
            res.send(err)
        })
    }



}


module.exports = EventCtrl