const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], 
    },
    email: {
      type: String,
      required: [true, "Email is required"], 
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ], // Custom regex for email validation
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\d{10}$/, "Mobile number must be 10 digits"], // Custom validation for mobile number (10 digits)
    },
    password: {
      type: String,
      required: [true, "Password is required"], 
      minlength: [6, "Password must be at least 6 characters long"], // Custom validation for minimum length of password
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
