const Booking = require("../models/bookingModel");

const findBooking = async (criteria) => {
  return await Booking.findOne(criteria);
};

module.exports = {
  findBooking,
};
