const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();

const connectDB = require("./config/database");
const serverHost = process.env.HOST || "localhost"
const serverPort = process.env.PORT || 3000;
const routes = require("./src/routes/index");

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(bodyParser.json());
app.use("/", routes);
app.use(function (req, res) {
  res.status(404).send({
    url: req.originalUrl + " not found"
  });
});

app.listen(serverPort);

console.log(`Realtime service started on port ${serverPort}`);
console.log(`Listening for traffic @ http://${serverHost}:${serverPort}`);

module.exports = app;