require('dotenv').config({ path: '../config/.env' });// services/chatbotService.js
const axios = require('axios');


const GOOGLE_API_KEY = 'AIzaSyCsyuRg9iRvMnE2Mvr4gFsjW54GS0-FPrQ'
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
async function processChat(message) {
  
  const prompt = `
    You are a chatbot designed to assist users on a platform focused on NLP (Natural Language Processing) and Arabic language research. 
    The platform is used by researchers, students, and professionals working on projects related to Arabic NLP, machine translation, sentiment analysis, and other linguistic tasks.

    Context:
    - The platform supports both Arabic and English.
    - The chatbot's primary role is to provide helpful information, answer questions, and guide users within the scope of the platform.
    - If the user asks about unrelated topics (e.g., weather, sports), politely inform them that the chatbot is designed for NLP and Arabic language-related queries.

    Instructions:
    - Respond in the same language as the user's input.
    - Provide concise, accurate, and relevant answers.
    - If the question is unclear or ambiguous, ask for clarification before responding.

    User Input: ${message}
    Response:
  `;

  // Step 2: Call the Gemini API with the crafted prompt
  const geminiResponse = await callGemini(prompt);

  // Step 3: Return the response from Gemini
  return geminiResponse || "I'm not sure how to respond to that.";
}

module.exports = { processChat };