const { Event, User } = require("../models");
const checkPwd = require("../helpers/dcrypt");

class HomeController {
  static home(req, res) {
    res.render("home", { error: req.query.error });
  }

  static login(req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(data => {
      if (data) {
        console.log(checkPwd(req.body.password, data.password));
        if (checkPwd(req.body.password, data.password)) {
          req.session.user = data.username;
          res.redirect("/users");
        } else {
          res.redirect("/?error=Incorrect Password");
        }
      } else {
        res.redirect("/?error=Username Not Found");
      }
    });
  }

  static logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
      }
    });
  }
}



module.exports = HomeController