// controllers/chatbot.js
const chatbotService = require('../services/chatbotService');

async function handleChat(req, res) {
  const { message } = req.body;

  try {
    
    const response = await chatbotService.processChat(message);
    return res.json({ response });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return res.status(500).json({ response: "An error occurred while processing your request." });
  }
}

module.exports = { handleChat };