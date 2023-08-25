const mysql = require("mysql");
const options = require("../../config/database.js");

var connection = mysql.createPool({
  host: options.hostname,
  user: options.username,
  password: options.password,
  database: options.database
});

module.exports = connection;