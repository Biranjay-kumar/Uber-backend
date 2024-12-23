const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { provideFeedback, getPassengerBookings } = require("../controllers/passengerController");
const router = express.Router();

module.exports = (io) => {
  router.get("/bookings", authMiddleware, getPassengerBookings);
  router.get("/feedback", authMiddleware, provideFeedback);
  return router;
};
