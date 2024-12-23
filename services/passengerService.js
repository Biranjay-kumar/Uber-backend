const bookingRepository = require("../repository/bookingRepository");

const getPassengerBookings = async (passengerId) => {
  try {
    const booking = await bookingRepository.findBooking({
      passenger: passengerId,
    });
    return booking;
  } catch (error) {
		console.error("Error fetching passenger bookings:", error.message);
    throw new Error("Error fetching bookings.");	
	}
};

const provideFeedback = async (passengerId, bookingId, rating, feedback) => {
  try {
    // Find booking using passengerId and bookingId
    const booking = await bookingRepository.findBooking({
      _id: bookingId,
      passenger: passengerId,
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    // Update booking with feedback and rating
    booking.rating = rating;
    booking.feedback = feedback;

    // Save updated booking
    await booking.save();

    return {
      success: true,
      message: "Feedback provided successfully",
      booking: booking,
    };
  } catch (error) {
    throw new Error(error.message); // Rethrow any errors
  }
};

module.exports = {
  getPassengerBookings,
  provideFeedback,
};
