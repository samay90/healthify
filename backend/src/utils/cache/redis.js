const redis = require("redis");
require("dotenv").config();
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
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