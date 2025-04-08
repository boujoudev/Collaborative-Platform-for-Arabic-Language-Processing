const express = require('express');
const router = express.Router();
const CorpusFileController = require('../controllers/CorpusFileController');

// Get all corpus files
router.get('/', CorpusFileController.getAllCorpusFiles);

// Get a single corpus file by ID
router.get('/:id', CorpusFileController.getCorpusFileById);

// Create a new corpus file
router.post('/', CorpusFileController.createCorpusFile);

// Update a corpus file
router.put('/:id', CorpusFileController.updateCorpusFile);

// Delete a corpus file
router.delete('/:id', CorpusFileController.deleteCorpusFile);

module.exports = router;