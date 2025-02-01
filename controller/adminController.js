const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../model/Admin"); // Admin model
const faqConstants = require("../utils/constants");

dotenv.config();

/**
 * @description Admin signup - Registers a new admin user
 * @route POST /api/admin/signup
 * @param {Object} req - Express request object containing `username` and `password`
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with JWT token
 */
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the admin already exists in the database
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res
        .status(faqConstants.ADMIN_EXIST.code)
        .json({ message: faqConstants.ADMIN_EXIST.message });
    }

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the admin's password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin instance
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();

    // Generate a JWT token for authentication
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Respond with the generated token
    res.status(faqConstants.SUCCESS).json({ token });
  } catch (err) {
    res.status(faqConstants.INTERNAL_SERVER_ERROR.code).json({
      message: faqConstants.INTERNAL_SERVER_ERROR.message,
      error: err.message,
    });
  }
};

/**
 * @description Admin login - Authenticates an admin and generates a JWT token
 * @route POST /api/admin/login
 * @param {Object} req - Express request object containing `username` and `password`
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with JWT token
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin in the database by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(faqConstants.INVALID_CREDENTIAL.code)
        .json({ message: faqConstants.INVALID_CREDENTIAL.message });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(faqConstants.INVALID_CREDENTIAL.code)
        .json({ message: faqConstants.INVALID_CREDENTIAL.message });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expires in 1 hour
    });

    // Respond with the generated token
    res.json({ token });
  } catch (err) {
    res.status(faqConstants.INTERNAL_SERVER_ERROR.code).json({
      message: faqConstants.INTERNAL_SERVER_ERROR.message,
      error: err.message,
    });
  }
};
