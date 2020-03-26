const bcrypt = require("bcryptjs");

function hashing(string) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(string, salt);
  return hash;
}

module.exports = hashing;