const connection = require("../services/database.js");

// constructor
const Client = function(client) {
  this.username = client.username;
  this.email = client.email;
  this.phone = client.phone;
  this.auth_key = client.auth_key;
};

Client.findByToken = (token, result) => {
  connection.query(`SELECT * FROM mt_users WHERE auth_key = ${token}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found client: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Client with the token
    result({ kind: "not_found" }, null);
  });
};

module.exports = Client;