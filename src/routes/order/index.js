'use strict';
const express = require('express');
const router = express.Router();
const redis = require('redis');

var messageId = 0;

router.get('/', async function (req, res) {
    const subClient = redis.createClient({ url: process.env.REDIS_URL });
    subClient.on('error', err => console.log('Redis Client Error', err));

    await subClient.connect().then(() => {
        console.log(`Redis connected`)
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
        res.write(`data: ` + message + `\r\n\n`);
        // res.end();
    });

    await subClient.subscribe('orders-nepalgunj', (message, chanel) => {
        messageId++;
        res.write(`id: ${messageId}\r\n`);
        res.write(`event: orders-nepalgunj\r\n`);
        res.write(`data: ` + message + `\r\n\n`);
        // res.end();
    });
});

router.get('/:city', async function (req, res) {
    var city = req.params.city;
    const subClient = redis.createClient({ url: process.env.REDIS_URL });
    subClient.on('error', err => console.log('Redis Client Error', err));

    await subClient.connect().then(() => {
        console.log(`Redis connected`)
    });

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    });

    await subClient.subscribe(`orders-${city}`, (message, chanel) => {
        messageId++;
        res.write(`id: ${messageId}\r\n`);
        res.write(`event: orders-${city}\r\n`);
        res.write(`data: ` + message + `\r\n\n`);
    });
});

router.post('/', async function (req, res) {
    const pubClient = redis.createClient({ url: process.env.REDIS_URL });
    pubClient.on('error', err => console.log('Redis Client Error', err));

    pubClient.connect().then(() => {
        console.log(`Redis connected from orders.`)
    });
    try {
        pubClient.publish(`orders`, JSON.stringify(req.body));
        console.log(`Publishing an order on orders with :${req.body}`);
        return res.json({
            detail: 'Publishing an order on orders successful',
        });
    } catch (error) {
        return res.status(500).json({
            detail: error
        });
    }
});

router.post('/:city', async function (req, res) {
    var city = req.params.city;
    const pubClient = redis.createClient({ url: process.env.REDIS_URL });
    pubClient.on('error', err => console.log('Redis Client Error', err));

    pubClient.connect().then(() => {
        console.log(`Redis connected from orders-${city}.`)
    });
    try {
        pubClient.publish(`orders-${city}`, JSON.stringify(req.body));
        console.log(`Publishing an order on orders-${city} with :${req.body}`);
        return res.json({
            detail: `Publishing an order on orders-${city} successful`,
        });
    } catch (error) {
        return res.status(500).json({
            detail: error
        });
    }
});

module.exports = router;