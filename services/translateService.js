/**
 * Translates a given text into the specified language.
 *
 * @param {string} text - The text to be translated.
 * @param {string} lang - The target language code (e.g., "fr" for French).
 * @returns {Promise<{success?: boolean, message?: string, text: string}>}
 *          A promise resolving to an object containing the translated text or an error message.
 */
const translateText = async (text, lang) => {
  try {
    // Construct the translation API URL
    const url = process.env.TRANSLATE_URL + `?q=${text}!&langpair=en|${lang}`;

    // Make an API request to fetch the translated text
    const res = await fetch(url);
    const response = await res.json();

    // Check if the translation response is successful
    if (response.responseStatus !== 200) {
      return {
        success: false,
        message: "Invalid language!",
        text: "",
      };
    }

    // Extract the translated text from the response
    const translatedText = response?.responseData?.translatedText;

    return { text: translatedText };
  } catch (err) {
    console.error("Translation error:", err);
    return {
      success: false,
      message: "Translation failed due to an error.",
      text: "",
    };
  }
};

module.exports = { translateText };
