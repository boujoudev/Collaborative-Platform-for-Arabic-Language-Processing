const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');

router.post('/experiences', experienceController.createExperience);
router.get('/experiences', experienceController.getAllExperiences);
router.get('/experiences/:id', experienceController.getExperienceById);
router.put('/experiences/:id', experienceController.updateExperience);
router.delete('/experiences/:id', experienceController.deleteExperience);
router.get('/experiences', experienceController.getExperiencesByUserId); 

module.exports = router;