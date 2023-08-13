const redis = require('redis');
const nameChannel = "orders";

let OrderController = {};

const orderStorage = [];

const subClient = redis.createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });
subClient.on('error', err => console.log('Redis Client Error', err));

subClient.subscribe(nameChannel, (order) => {
    console.log("Capturing an Event using Redis to: " + order);
    orderStorage.push(JSON.parse(order));
});

subClient.connect().then(() => {
    console.log("Redis connected")
});

OrderController.index = (req, res) => {
    try {
        return res.json({ orders: orderStorage });
    } catch (error) {
        return res.status(500).json({
            detail: error.order
        });
    }
};

OrderController.create = (req, res) => {
    const pubClient = redis.createClient({ url: "redis://localhost:6379" });
    pubClient.on('error', err => console.log('Redis Client Error', err));

    pubClient.connect().then(() => {
        console.log("Redis connected")
    });
    try {
        pubClient.publish(nameChannel, JSON.stringify(req.body));
        console.log(`Publishing an Event using Redis to :${req.body.order}`);
        return res.json({
            detail: 'Publishing an Event using Redis successful',
        });
    } catch (error) {
        return res.status(500).json({
            detail: error.order
        });
    }
};

module.exports = OrderController;