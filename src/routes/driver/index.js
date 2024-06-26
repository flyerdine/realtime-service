'use strict';
const express = require('express');
const router = express.Router();
const redis = require('redis');

var messageId = 0;

/**
 * @deprecated
 */
router.get('/', async function (req, res) {
    const subClient = redis.createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
    });
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

    await subClient.subscribe('drivers', (message, chanel) => {
        messageId++;
        res.write(`id: ${messageId}\r\n`);
        res.write(`event: drivers\r\n`);
        res.write("data: " + message + "\r\n\n");
    });
});

router.post('/', async function (req, res) {
    const pubClient = redis.createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
    });
    pubClient.on('error', err => console.log('Redis Client Error', err));

    pubClient.connect().then(() => {
        console.log("Redis connected from driver latlng.")
    });
    try {
        pubClient.publish(`drivers`, JSON.stringify(req.body));
        console.log(`Publishing an driver latlng on drivers with :${req.body}`);
        return res.json({
            detail: `Publishing an driver latlng on drivers successful`,
        });
    } catch (error) {
        return res.status(500).json({
            detail: error
        });
    }
});

/**
 * @deprecated
 */
router.get('/:driver_id', async function (req, res) {
    var driver_id = req.params.driver_id;

    const subClient = redis.createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
    });
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

    await subClient.subscribe(driver_id, (message, chanel) => {
        messageId++;
        res.write(`id: ${messageId}\r\n`);
        res.write(`event: ${driver_id}\r\n`);
        res.write("data: " + message + "\r\n\n");
    });
});

/**
 * @deprecated
 */
router.post('/:driver_id', async function (req, res) {
    var driver_id = req.params.driver_id;

    const pubClient = redis.createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
    });
    pubClient.on('error', err => console.log('Redis Client Error', err));

    pubClient.connect().then(() => {
        console.log("Redis connected from driver latlng.")
    });
    try {
        pubClient.publish(driver_id, JSON.stringify(req.body));
        console.log(`Publishing an driver latlng on ${driver_id} qith :${req.body}`);
        return res.json({
            detail: `Publishing an driver latlng on ${driver_id} successful`,
        });
    } catch (error) {
        return res.status(500).json({
            detail: error
        });
    }
});

module.exports = router;
