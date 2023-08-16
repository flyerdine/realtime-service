'use strict';
const express = require('express');
const router = express.Router();
const redis = require('redis');
const OrderController = require('../../controllers/orderController');

var messageId = 0;

router.get('/', async function (req, res) {
    const subClient = redis.createClient({ url: process.env.REDIS_URL });
    subClient.on('error', err => console.log('Redis Client Error', err));

    await subClient.connect().then(() => {
        console.log("Redis connected")
    });

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    });

    await subClient.subscribe('orders', (message, chanel) => {
        messageId++;
        res.write(`id: ${messageId}\r\n`);
        res.write(`event: orders\r\n`);
        res.write("data: " + message + "\r\n\n");
        // res.end();
    });

    await subClient.subscribe('orders-nepalgunj', (message, chanel) => {
        messageId++;
        res.write(`id: ${messageId}\r\n`);
        res.write(`event: orders-nepalgunj\r\n`);
        res.write("data: " + message + "\r\n\n");
        // res.end();
    });
});

router.get('/nepalgunj', async function (req, res) {
    const subClient = redis.createClient({ url: process.env.REDIS_URL });
    subClient.on('error', err => console.log('Redis Client Error', err));

    await subClient.connect().then(() => {
        console.log("Redis connected")
    });

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    });

    await subClient.subscribe('orders-nepalgunj', (message, chanel) => {
        messageId++;
        res.write(`id: ${messageId}\r\n`);
        res.write(`event: orders-nepalgunj\r\n`);
        res.write("data: " + message + "\r\n\n");
    });
});

router.post('/', OrderController.create, function (req, res) {
    console.log(req);
    console.log(res);
});

module.exports = router;