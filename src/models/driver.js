const connection = require("../services/database.js");

// constructor
const Driver = function(driver) {
  this.username = driver.username;
  this.email = driver.email;
  this.phone = driver.phone;
  this.auth_key = driver.auth_key;
};

Driver.findByToken = (token, result) => {
  connection.query(`SELECT * FROM mt_drivers WHERE auth_key = ${token}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found driver: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Driver with the token
    result({ kind: "not_found" }, null);
  });
};

module.exports = Driver;