const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authenticate } = require('../middlewares/authMiddleware');

// Envoyer un message
router.post('/', authenticate, messageController.sendMessage);

// Obtenir la conversation avec un utilisateur
router.get('/:userId', authenticate, messageController.getConversation);

module.exports = router; 