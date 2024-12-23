const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Corrected import name

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // Removes leading/trailing whitespace
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Prevents password from being returned in queries by default
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensures email uniqueness at the database level
      lowercase: true, // Converts email to lowercase before saving
      trim: true,
      validate: {
        validator: function (v) {
          // Basic email regex for validation
          return /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    role: {
      type: String,
      enum: ["passenger", "driver", "both"],
      default: "passenger", // Changed default to match enum
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        // Validate coordinates length and range
        validate: {
          validator: function (v) {
            return v.length === 2 && 
                   v[0] >= -180 && v[0] <= 180 && // Longitude
                   v[1] >= -90 && v[1] <= 90;    // Latitude
          },
          message: (props) => `Coordinates must be an array of [longitude, latitude] within valid ranges.`,
        },
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: { virtuals: true, transform: hideSensitiveFields },
    toObject: { virtuals: true, transform: hideSensitiveFields },
  }
);

// Virtual field for full address or other computed properties (optional)
userSchema.virtual("fullName").get(function () {
  return this.name; // Modify as needed
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(12); // Generates a salt with 12 rounds
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Function to hide sensitive fields when converting to JSON or Object
function hideSensitiveFields(doc, ret, options) {
  delete ret.password;
  delete ret.__v;
  return ret;
}

// Creating a 2dsphere index for geospatial queries
userSchema.index({ location: "2dsphere" });

// Exporting the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
