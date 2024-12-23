const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDb;
