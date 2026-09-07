const { createClient } = require('redis');

/**
 * Redis client — caches frequently accessed data to reduce DB load.
 */
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
});

redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.connect();

module.exports = redisClient;
