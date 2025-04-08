const express = require('express');
const router = express.Router();
const AnnotationFileController = require('../controllers/AnnotationFileController');

// Get all annotation files
router.get('/', AnnotationFileController.getAllAnnotationFiles);

// Get a single annotation file by ID
router.get('/:id', AnnotationFileController.getAnnotationFileById);

// Create a new annotation file
router.post('/', AnnotationFileController.createAnnotationFile);

// Update an annotation file
router.put('/:id', AnnotationFileController.updateAnnotationFile);

// Delete an annotation file
router.delete('/:id', AnnotationFileController.deleteAnnotationFile);

module.exports = router;