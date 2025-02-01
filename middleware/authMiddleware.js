// authMiddleware.js - Middleware for authenticating users using JWT

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const faqConstants = require("../utils/constants");

dotenv.config();

/**
 * Middleware function to authenticate API requests using JWT.
 *
 * @param {Object} req - The request object containing headers and body.
 * @param {Object} res - The response object to send back HTTP responses.
 * @param {Function} next - The next middleware function to be executed.
 *
 * @returns {void} - Calls `next()` if authentication is successful, otherwise sends an error response.
 */
exports.authenticate = (req, res, next) => {
  // Retrieve token from request headers or body
  const token = req.headers["auth-token"] || req.body.token;

  // If no token is provided, return an unauthorized error
  if (!token) {
    return res
      .status(faqConstants.TOKEN_UNAVAILABLE.code)
      .json({ message: faqConstants.TOKEN_UNAVAILABLE.message });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware/controller
    next();
  } catch (err) {
    // Return an error response if token verification fails
    res
      .status(faqConstants.INVALID_TOKEN.code)
      .json({ message: faqConstants.INVALID_TOKEN.message });
  }
};
