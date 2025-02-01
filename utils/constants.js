/**
 * @file constants.js
 * @description This file contains common error codes and messages used throughout the application.
 * The error codes help to standardize the responses and provide consistent error handling.
 * It exports a set of predefined error codes and messages to be used in controllers and services.
 * 
 * Example usage:
 * - INTERNAL_SERVER_ERROR: Handles general server errors.
 * - ADMIN_EXIST: Used when attempting to create a duplicate admin.
 * - SUCCESS: Represents a successful operation.
 * - INVALID_CREDENTIAL: Used when login credentials are invalid.
 * - TOKEN_UNAVAILABLE: Used when no authentication token is provided.
 * - INVALID_TOKEN: Used when an authentication token is invalid.
 * 
 * @exports {Object} errorCodes - Predefined error codes and messages.
 */

module.exports = {
    INTERNAL_SERVER_ERROR: {
        code: 500,
        message: "Internal server error",
    },
    ADMIN_EXIST: {
        code: 400,
        message: "Admin already exist",
    },
    SUCCESS: 200,
    INVALID_CREDENTIAL: {
        code: 401,
        message: "Invalid credentials!",
    },
    TOKEN_UNAVAILABLE: {
        code: 401,
        message: "Access denied. No token provided."
    },
    INVALID_TOKEN: {
        code: 400,
        message: "Invalid token.",
    },
};