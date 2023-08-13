'use strict';
const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/orderController');

router.get('/', OrderController.index, function (req, res) {
    console.log(req);
    console.log(res);
});
router.post('/', OrderController.create, function (req, res) {
    console.log(req);
    console.log(res);
});

module.exports = router;