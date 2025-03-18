const Redis = require('ioredis');

const redisClient = new Redis({
    host: 'localhost', // Use 'redis' if running in Docker Compose
    port: 6379
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

console.log('Connected to Redis');

module.exports = redisClient;