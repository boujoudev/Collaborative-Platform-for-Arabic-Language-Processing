const express = require('express');
const router = express.Router();
const PublicationController = require('../controllers/PublicationController');

// Get all publications
router.get('/', PublicationController.getAllPublications);

// Get a single publication by ID
router.get('/:id', PublicationController.getPublicationById);

// Create a new publication
router.post('/', PublicationController.createPublication);

// Update a publication
router.put('/:id', PublicationController.updatePublication);

// Delete a publication
router.delete('/:id', PublicationController.deletePublication);

module.exports = router;