const express = require('express');
const router = express.Router();
const NLPToolController = require('../controllers/NLPToolController');

// Get all NLP tools
router.get('/', NLPToolController.getAllNLPTools);

// Get a single NLP tool by ID
router.get('/:id', NLPToolController.getNLPToolById);

// Create a new NLP tool
router.post('/', NLPToolController.createNLPTool);

// Update an NLP tool
router.put('/:id', NLPToolController.updateNLPTool);

// Delete an NLP tool
router.delete('/:id', NLPToolController.deleteNLPTool);

module.exports = router;