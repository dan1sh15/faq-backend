// faqSchema.js - Defines the Mongoose schema for storing FAQs in the database

const mongoose = require("mongoose");

// Define the FAQ schema with question and answer fields
const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true }, // FAQ question (required)
    answer: { type: String, required: true }, // FAQ answer (required)
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps automatically

// Export the FAQ model for use in controllers and routes
module.exports = mongoose.model("FAQ", faqSchema);
