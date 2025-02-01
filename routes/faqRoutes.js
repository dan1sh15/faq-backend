// faqRoutes.js - Defines API routes for handling FAQ-related operations

const express = require('express');
const router = express.Router();
const faqController = require('../controller/faqController');
const { authenticate } = require('../middleware/authMiddleware'); // Middleware for authentication

// Route to fetch all FAQs
router.get('/get-faq', faqController.getFAQs);

// Route to store a new FAQ (Protected route - requires authentication)
router.post('/faq-store', authenticate, faqController.addFAQ);

// Route to translate FAQ text
router.get('/translate-text', faqController.translateFAQ);

module.exports = router;
