const express = require('express');
const router = express.Router();
const EvaluationController = require('../controllers/EvaluationController.js');

// Get all evaluations
router.get('/', EvaluationController.getAllEvaluations);

// Get evaluation by ID
router.get('/:id', EvaluationController.getEvaluationById);

// Create new evaluation
router.post('/', EvaluationController.createEvaluation);

// Update evaluation
router.put('/:id', EvaluationController.updateEvaluation);

// Delete evaluation
router.delete('/:id', EvaluationController.deleteEvaluation);

module.exports = router;