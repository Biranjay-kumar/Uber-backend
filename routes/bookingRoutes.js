const express = require("express");

const bookingRouter = express.Router();

module.exports = (io) => {
	bookingRouter.post('/', createBooking(io));
	bookingRouter.get('/confirm', confirmBooking(io));
	return router;
}