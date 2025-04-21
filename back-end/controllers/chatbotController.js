// controllers/chatbot.js
const chatbotService = require('../services/chatbotService');



async function handleChat(req, res) {
  const { message, userId } = req.body; // Ensure userId is passed in the request body

  if (!userId) {
    return res.status(400).json({ response: "User ID is required." });
  }

  try {
    const response = await chatbotService.processChat(message, userId);
    return res.json({ response });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return res.status(500).json({ response: "An error occurred while processing your request." });
  }
}

module.exports = { handleChat };

