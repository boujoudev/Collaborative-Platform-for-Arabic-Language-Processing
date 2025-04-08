const express = require('express');
const router = express.Router();
const CorpusController = require('../controllers/CorpusController');

// Get all corpuses
router.get('/', CorpusController.getAllCorpuses);

// Get a single corpus by ID
router.get('/:id', CorpusController.getCorpusById);

// Create a new corpus
router.post('/', CorpusController.createCorpus);

// Update a corpus
router.put('/:id', CorpusController.updateCorpus);

// Delete a corpus
router.delete('/:id', CorpusController.deleteCorpus);

module.exports = router;