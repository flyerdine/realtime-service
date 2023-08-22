"use strict";
const express = require("express");
const router = express.Router();

/** GET home page. */
router.get("/", function (req, res, next) {
    res.json({ message: "Welcome to the Event Service" });
});

/** Order Routes */
router.use('/orders', require("./order"));

/** Driver Routes */
router.use('/driver', require("./driver"));

/** Test Route */
router.get("/test", function (req, res, next) {
    res.json({ result: "Test success!" });
});

module.exports = router;