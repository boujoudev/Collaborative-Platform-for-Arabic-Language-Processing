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
    
    You are a chatbot designed to assist users on a platform focused on Natural Language Processing (NLP) and Arabic language research. 
The platform is used by researchers, students, and professionals working on projects related to Arabic NLP, machine translation, sentiment analysis, and other linguistic tasks.

### Conversation History:
${contextText}

### Current User Input:
${message}

### Instructions:
1. **Review the Conversation History**: Carefully analyze the past interactions to understand the flow of the discussion and identify any ongoing topics or unresolved queries.
2. **Contextual Awareness**:
   - If the current input refers to a previous topic, use the history to provide a coherent and relevant response.
   - If the current input introduces a new topic, treat it as a fresh query but still consider the overall context of the conversation.
3. **Language Consistency**: Respond in the same language as the user's input. If the user switches languages, follow their lead.
4. **Clarity and Conciseness**: Provide clear, concise, and polite responses. Avoid overly technical jargon unless the user demonstrates familiarity with it.
5. **Domain Expertise**: Focus on topics related to NLP, Arabic language research, machine translation, sentiment analysis, and other linguistic tasks. If the user asks about unrelated topics, politely inform them that your expertise is limited to the platform's scope.
6. **Problem-Solving**: If the user asks for help with a task or question, guide them step-by-step or provide actionable advice.
7. **Fallback Mechanism**: If you cannot answer a question due to lack of information, politely inform the user and ask clarifying questions if needed.

### Response:
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