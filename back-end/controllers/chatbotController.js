// controllers/chatbot.js
const chatbotService = require('../services/chatbotService');
const ChatHistory = require('../models').ChatHistory;


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

async function getChatHistory(req, res) {
  const { userId } = req.params;

  try {
    const history = await ChatHistory.findAll({
      where: { user_id: userId },
      order: [['timestamp', 'ASC']], // messages dans l'ordre chronologique
    });

    res.json({ history });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "An error occurred while retrieving chat history." });
  }
}

module.exports = { handleChat, getChatHistory };

