const express = require('express');
const app = express();
require("dotenv").config();

const serverHost = process.env.HOSTNAME || "localhost"
const serverPort = process.env.PORT || 3000;

let routes = require("./src/routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json())


// app.use(bodyParser.json());
app.use("/", routes);
app.use(function (req, res) {
  res.status(404).send({
    url: req.originalUrl + " not found"
  });
});

app.listen(serverPort);

console.log(`RESTful API server started on port ${serverPort}`);
console.log(`Listening for traffic @ http://${serverHost}:${serverPort}`);

module.exports = app;