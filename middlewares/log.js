function log(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/?error=Please Log In First");
    }
  }
  
  module.exports = log;  