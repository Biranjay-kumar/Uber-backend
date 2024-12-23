const express = require("express");
const { register, login } = require("../controllers/authController.js");
const router = express.Router();


// Import the register and login controller functions

// Define routes
router.post("/register", register); 
router.post("/login", login); 

module.exports = router;
