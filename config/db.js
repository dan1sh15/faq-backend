const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

/**
 * @description Connects to the MongoDB database using Mongoose
 * @function connectDB
 * @returns {void}
 * @throws {Error} If the connection to MongoDB fails
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI stored in environment variables
    await mongoose.connect(process.env.MONGO_URI);

    // Log a success message when the connection is established
    console.log("MongoDB connected");
  } catch (err) {
    // Log any connection error to the console
    console.error("MongoDB connection error:", err);

    // Exit the process with a failure code if the connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
