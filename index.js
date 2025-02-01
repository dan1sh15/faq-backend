// Import required modules
const express = require("express"); // Express framework for building the server
const dotenv = require("dotenv"); // Load environment variables from .env file
const connectDB = require("./config/db"); // Database connection utility
const faqRoutes = require("./routes/faqRoutes"); // Routes for FAQ-related endpoints
const adminRoutes = require("./routes/adminRoutes"); // Routes for admin-related endpoints

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use FAQ routes for requests starting with /api/faqs
app.use("/api/faqs", faqRoutes);

// Use Admin routes for requests starting with /api/admin
app.use("/api/admin", adminRoutes);

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
