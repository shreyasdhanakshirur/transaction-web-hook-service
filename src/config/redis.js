const IORedis = require("ioredis");

const redis = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,   // 🔴 REQUIRED for BullMQ
  enableReadyCheck: false       // 🔴 REQUIRED for BullMQ
});

module.exports = redis;
