Client = require("../models/client");

const auth = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    Client.findByToken(req.headers.authorization.split(' ')[1], (err, data) => {
      if (err) req.data = undefined;
      req.data = data;
      next();
    });
  } else {
    req.data = undefined;
    next();
  }
};
module.exports = auth;