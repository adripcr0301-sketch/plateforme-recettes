const { createClient } = require('redis');

/**
 * Redis client — caches frequently accessed data to reduce DB load.
 * Falls back gracefully if Redis is unavailable (dev without Redis).
 */
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    reconnectStrategy: (retries) => {
      if (retries >= 3) return false; // arrête de réessayer
      return 1000;
    },
  },
});

redisClient.on('error', () => {}); // silencieux si Redis absent

redisClient.connect().catch(() => {});

module.exports = redisClient;
