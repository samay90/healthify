const redis = require("redis");
require("dotenv").config();
const client = redis.createClient({
    socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    reconnectStrategy: (retries) => {
      if (retries > 10) return new Error("Redis failed");
      return Math.min(retries * 100, 2000);
    },
  },

})

client.on("error", (err) => {
  console.error("Redis Client Error");
});

(async () => {
  try {
    await client.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error("Redis connection failed");
  }
})();

module.exports = client;