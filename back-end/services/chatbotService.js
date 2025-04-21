const dotnenv = require('dotenv')// services/chatbotService.js
const { ChatHistory } = require('../models');
const axios = require('axios');
dotnenv.config()
console.log(process.env.GOOGLE_API_KEY)

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  throw new Error("Google API key is not set in the environment variables.");
}

// Call the Gemini API to generate a natural language response
async function callGemini(prompt) {
  const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCsyuRg9iRvMnE2Mvr4gFsjW54GS0-FPrQ";
  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an issue while processing your request.";
  }
}

// Main function to process chat
async function processChat(message, userId) {
  // Step 1: Retrieve past conversations for context
  const pastConversations = await retrieveContext(userId);

  // Step 2: Craft the prompt with context
  const contextText = pastConversations
    .map((entry, index) => `Interaction ${index + 1}:\nUser: ${entry.input_text}\nBot: ${entry.response_text}`)
    .join('\n\n');

  const prompt = `
    You are a chatbot designed to assist users on a platform focused on NLP (Natural Language Processing) and Arabic language research. 
    The platform is used by researchers, students, and professionals working on projects related to Arabic NLP, machine translation, sentiment analysis, and other linguistic tasks.

    Context:
    - The platform supports both Arabic and English.
    - The chatbot's primary role is to provide helpful information, answer questions, and guide users within the scope of the platform.
    - If the user asks about unrelated topics (e.g., weather, sports), politely inform them that the chatbot is designed for NLP and Arabic language-related queries.
    -you have the past conversations with the user to refer to so you can provide more relevant and personalized responses.

    Instructions:
    - Respond in the same language as the user's input.
    - Provide concise, accurate, and relevant answers.

    Past Conversations:
    ${contextText}

    User Input: ${message}
    Response:
  `;

  // Step 3: Call the Gemini API with the crafted prompt
  const geminiResponse = await callGemini(prompt);

  // Step 4: Store the current interaction in the database
  await storeConversation(userId, message, geminiResponse);

  // Step 5: Return the response from Gemini
  return geminiResponse || "I'm not sure how to respond to that.";
}



// Helper function to retrieve context
async function retrieveContext(userId, limit = 5) {
  try {
    const results = await ChatHistory.findAll({
      where: { user_id: userId },
      order: [['timestamp', 'DESC']],
      limit: limit,
    });
    return results.map(entry => ({
      input_text: entry.input_text,
      response_text: entry.response_text,
    }));
  } catch (error) {
    console.error('Error retrieving context:', error);
    return [];
  }
}

// Helper function to store a conversation
async function storeConversation(userId, userInput, botResponse) {
  try {
    await ChatHistory.create({
      user_id: userId,
      input_text: userInput,
      response_text: botResponse,
    });
    console.log('Conversation stored successfully.');
  } catch (error) {
    console.error('Error storing conversation:', error);
  }
}

module.exports = { processChat };