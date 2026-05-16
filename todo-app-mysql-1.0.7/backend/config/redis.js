const redis = require('redis');

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || undefined
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    await redisClient.connect();
    console.info('Redis connected');
  } catch (error) {
    console.error('Redis connection error:', error);
    redisClient = null;
  }
};

const disconnectRedis = async () => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    console.info('Redis disconnected');
  }
};

const getRedisClient = () => {
  return redisClient;
};

module.exports = { connectRedis, disconnectRedis, getRedisClient };
