const bcrypt = require("bcryptjs");

function checkPwd(str, hash) {
  return bcrypt.compareSync(str, hash);
}

module.exports = checkPwd;