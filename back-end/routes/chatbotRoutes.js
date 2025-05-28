const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
router.post('/', chatbotController.handleChat);
router.get('/:userId/history', chatbotController.getChatHistory);

module.exports = router;