const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Passenger reference is required"],
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Driver reference is required"],
    },
    source: {
      latitude: {
        type: Number,
        required: [true, "Source latitude is required"],
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        required: [true, "Source longitude is required"],
        min: -180,
        max: 180,
      },
    },
    destination: {
      latitude: {
        type: Number,
        required: [true, "Destination latitude is required"],
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        required: [true, "Destination longitude is required"],
        min: -180,
        max: 180,
      },
    },
    fare: {
      type: Number,
      required: [true, "Fare amount is required"],
      min: [0, "Fare cannot be negative"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected", "cancelled", "completed"],
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    feedback: {
      type: String,
      trim: true,
      maxlength: [500, "Feedback cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
