const Redis = require("ioredis");
require('dotenv').config(); // Load environment variables from .env file

const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => console.log('Redis connected'));
redis.on('error', (err) => console.log('Redis error', err));

module.exports = redis;