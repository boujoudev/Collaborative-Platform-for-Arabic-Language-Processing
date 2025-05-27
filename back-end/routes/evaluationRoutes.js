const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/', authenticate, evaluationController.createOrUpdateEvaluation);
router.delete('/:entity_type/:entity_id', authenticate, evaluationController.deleteEvaluation);
router.get('/:entity_type/:entity_id', evaluationController.getEvaluationsByEntity);

module.exports = router;
