// adminSchema.js - Defines the Mongoose schema for storing admin user credentials

const mongoose = require("mongoose");

// Define the Admin schema with username and password fields
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensures the username is unique across all admins
    },
    password: {
      type: String,
      required: true, // Stores the hashed password for authentication
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps automatically

// Export the Admin model for use in authentication and admin management
module.exports = mongoose.model("Admin", adminSchema);
