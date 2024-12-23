const passengerService = require("../services/passengerService");

const getPassengerBookings = async (req, res) => {
  try {
    // Assuming req.user contains the passenger's ID or relevant info
    const bookings = await passengerService.getPassengerBookings(req.user);

    res.status(200).json({
      success: true,
      data: bookings,
      message: "Bookings fetched successfully",
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({
      success: false,
      data: null,
      message: "Error fetching bookings",
    });
  }
};

const provideFeedback = async (req, res) => {
  const { bookingId, rating, feedback } = req.body; // Get feedback and rating from body
  const { passengerId } = req.user; // Assuming passengerId is set in req.user
  
  try {
    // Call the provideFeedback method from the service
    const result = await passengerService.provideFeedback(passengerId, bookingId, rating, feedback);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Feedback provided successfully",
      data: result, // Include the updated booking or relevant data
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error providing feedback",
    });
  }
};

module.exports = {
  getPassengerBookings,
  provideFeedback,
};
