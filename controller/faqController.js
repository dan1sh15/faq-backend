// faqController.js - Handles FAQ-related operations
const faqConstants = require("../utils/constants");
const FAQ = require("../model/FAQ");
const { translateText } = require("../services/translateService");

/**
 * @description Fetch all FAQs with pagination
 * @route GET /api/faqs
 * @param {Object} req - Express request object containing query parameters for pagination
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with FAQs and pagination metadata
 */
exports.getFAQs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10 per page
    const skip = (page - 1) * limit; // Calculate number of documents to skip

    // Fetch FAQs with pagination
    const faqs = await FAQ.find().skip(skip).limit(parseInt(limit));

    // Format the response
    const formattedFAQs = faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }));

    // Get the total count of FAQs for pagination metadata
    const totalFAQs = await FAQ.countDocuments();

    return res.status(faqConstants.SUCCESS).json({
      success: true,
      message: "FAQs fetched successfully",
      faqs: formattedFAQs,
      total: totalFAQs, // Total number of FAQs
      page: parseInt(page), // Current page
      total_page: Math.ceil(totalFAQs / limit), // Total pages
      offset: parseInt(limit), // Number of FAQs per page
    });
  } catch (err) {
    res.status(faqConstants.INTERNAL_SERVER_ERROR.code).json({
      message: faqConstants.INTERNAL_SERVER_ERROR.message,
      error: err.message,
    });
  }
};

/**
 * @description Translate FAQ text to a specified language
 * @route GET /api/faqs/translate-text
 * @param {Object} req - Express request object containing `lang` and `text` query parameters
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with translated text
 */
exports.translateFAQ = async (req, res) => {
  try {
    const { lang, text } = req.query;

    // Call the translation service
    const translatedText = await translateText(text, lang);

    // Handle invalid language errors
    if (translatedText.success === false) {
      return res.status(401).json({
        success: false,
        message: translatedText.message,
      });
    }

    return res.status(faqConstants.SUCCESS).json({
      success: true,
      message: "Text translated successfully",
      text: translatedText.text,
    });
  } catch (error) {
    res.status(faqConstants.INTERNAL_SERVER_ERROR.code).json({
      message: faqConstants.INTERNAL_SERVER_ERROR.message,
      error: err.message,
    });
  }
};

/**
 * @description Add a new FAQ (Admin only)
 * @route POST /api/faqs/faq-store
 * @param {Object} req - Express request object containing FAQ data in the body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with newly created FAQ
 */
exports.addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Create a new FAQ instance
    const newFAQ = new FAQ({ question, answer });

    // Save the FAQ to the database
    await newFAQ.save();

    res.status(faqConstants.SUCCESS).json({
      success: true,
      message: "FAQ added successfully",
      faq: newFAQ,
    });
  } catch (err) {
    res.status(faqConstants.INTERNAL_SERVER_ERROR.code).json({
      message: faqConstants.INTERNAL_SERVER_ERROR.message,
      error: err.message,
    });
  }
};
