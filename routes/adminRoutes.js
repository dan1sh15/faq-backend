// adminRoutes.js - Defines API routes for admin authentication and management

const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController"); // Import admin controller

// Route for admin login
router.post("/login", adminController.login);

// Route for admin signup/registration
router.post("/signup", adminController.signup);

module.exports = router;
