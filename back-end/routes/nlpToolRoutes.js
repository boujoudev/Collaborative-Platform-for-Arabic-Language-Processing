const express = require('express');
const router = express.Router();
const nlpToolController = require('../controllers/nlpToolController');

// Middleware for authentication
const { authenticate } = require('../middlewares/authMiddleware');

// Get all NLP tools
// GET /api/nlp-tools
router.get('/', nlpToolController.getAllTools);

// Get a specific NLP tool by ID
// GET /api/nlp-tools/:id
router.get('/:id', nlpToolController.getToolById);

// Create a new NLP tool (requires authentication)
// POST /api/nlp-tools
router.post('/', authenticate, nlpToolController.createTool);

// Update an existing NLP tool (requires authentication)
// PUT /api/nlp-tools/:id
router.put('/:id', authenticate, nlpToolController.updateTool);

// Delete an NLP tool (requires authentication)
// DELETE /api/nlp-tools/:id
router.delete('/:id', authenticate, nlpToolController.deleteTool);

module.exports = router;