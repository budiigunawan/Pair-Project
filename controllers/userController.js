const { User, Event, User_Event } = require("../models");
const hash = require("../helpers/bcrypt");
const check = require("../helpers/dcrypt");
const mail = require("../helpers/mail")
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;
const { Op } = require("sequelize");

class UserController {
  static list(req, res) {
    User.findAll({})
      .then(data => {
        res.render("userList", { data });
      })
      .catch(err => {
        res.send(err);
      });
  }

  static form(req, res) {
    res.render("userForm.ejs");
  }

  static create(req, res) {
    User.create({
      username: req.body.username,
      password: hash(req.body.password),
      email: req.body.email,
      role: req.body.role
    })
      .then(data => {
        mail(data.email)
        res.redirect("/");
      })
      .catch(err => {
        res.send(err);
      });
  }

  static editForm(req, res) {
    User.findByPk(req.params.id)
      .then(data => {
        res.render("userEdit", { data });
      })
      .catch(err => {
        res.send(err);
      });
  }

  static update(req, res) {
    User.update(
      {
        username: req.body.username,
        password: hash(req.body.password),
        email: req.body.email,
        role: req.body.role
      },
      {
        where: {
          id: Number(req.params.id)
        }
      }
    )
      .then(data => {
        res.redirect("/users");
      })
      .catch(err => {
        res.send(err);
      });
  }

  static destroy(req, res) {
    User.destroy({
      where: {
        id: Number(req.params.id)
      }
    })
      .then(data => {
        res.redirect("/users");
      })
      .catch(err => {
        res.send(err);
      });
  }

  static myPage(req, res) {
    User.findOne({
      where: { username: req.session.user },
      include: [{ model: Event }]
    }).then(data => {
      res.render("myPage", { data });
    });
  }

  static editPage(req, res) {
    User.findOne({
      where: { username: req.session.user }
    }).then(data => {
      res.render("mySettings", { data , error:req.query.error});
    });
  }

  static editPagePost(req, res) {
    console.log(req.body.password);
    User.findOne({
      where: { username: req.session.user }
    })
      .then(data => {
        if (check(req.body.password, data.password)) {
          let obj;
          if (req.body.newpassword == null || req.body.newpassword == "") {
            obj = { email: req.body.email };
          } else {
            obj = {
              email: req.body.email,
              password: hash(req.body.newpassword)
            };
          }
          return User.update(obj, {
            where: {
              username: req.session.user
            }
          }).then(data => {
            res.redirect("/users");
          });
        } else {
          res.redirect("/users/settings?error=Invalid Password");
        }
      })
      .catch(err => {
        res.send(err);
      });
  }

  static removeEvent(req,res){
    User.findOne({ where: { username: req.session.user }})
    .then(data => {
      return User_Event.destroy({where:{[Op.and]: [{UserId: data.id},{EventId: req.params.id}]}})
    }).then(data=>{
      res.redirect("/users")
    }).catch(err=>{
      res.send(err)
    })
  

  }
}

module.exports = UserController;
