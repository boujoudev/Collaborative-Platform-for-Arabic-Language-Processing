const express = require('express');
const router = express.Router();
const corpusController = require('../controllers/corpusController');

// Middleware for authentication
const { authenticate } = require('../middlewares/authMiddleware');

// Get all corpora
// GET /api/corpus
router.get('/', corpusController.getAllCorpora);

// Get a specific corpus by ID
// GET /api/corpus/:id
router.get('/:id', corpusController.getCorpusById);

// Create a new corpus (requires authentication)
// POST /api/corpus
router.post('/', authenticate, corpusController.createCorpus);

// Update an existing corpus (requires authentication)
// PUT /api/corpus/:id
router.put('/:id', authenticate, corpusController.updateCorpus);

// Delete a corpus (requires authentication)
// DELETE /api/corpus/:id
router.delete('/:id', authenticate, corpusController.deleteCorpus);

module.exports = router;