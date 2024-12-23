const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./utils/connectDb");
const io = require("socket.io");
// Initialize the express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// ======================importing the routes =============================
const authRoutes = require("./routes/authRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const driverRoutes = require("./routes/driverRoutes");
const passengerRoutes = require("./routes/passengerRoutes");
const redisClient = require("./utils/redisClient");

// ======================importing the routes =============================

app.use(express.json());

// ======================implementing the routes =============================
app.use("/api/auth", authRoutes);
// app.use("/api/auth", bookingRoutes(io));
// app.use("/api/auth", driverRoutes);
app.use("/api/passenger", passengerRoutes(io));

// ======================implementing the routes =============================


// Simple test route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hi, I am coming from the backend!",
  });
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start the server and listen on the defined port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is listening on http://localhost:${PORT}`);
});


redisClient.on('connect', ()=>{
	console.log("redis connected");
})