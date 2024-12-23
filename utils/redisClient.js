const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});

// Event listener for successful connection
redisClient.on("connect", () => {
  console.log("Connected to Redis successfully.");
});

// Event listener for connection errors
redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Initialize the connection
(async () => {
  try {
    await redisClient.connect();
    console.log("Redis client initialized.");
  } catch (error) {
    console.error("Error initializing Redis client:", error.message);
    process.exit(1); // Exit process on failure
  }
})();

module.exports = redisClient;
