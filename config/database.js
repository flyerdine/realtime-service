module.exports = {
  hostname: process.env.MYSQL_HOSTNAME || "mariadb",
  username: process.env.MYSQL_USERNAME || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "database"
};