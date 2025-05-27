const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');

// POST /experiences/create
router.post('/create', experienceController.createExperience);

// GET /experiences/  --> récupère toutes les expériences
router.get('/', experienceController.getAllExperiences);

// GET /experiences/:id
router.get('/:id', experienceController.getExperienceById);

// PUT /experiences/:id
router.put('/:id', experienceController.updateExperience);

// DELETE /experiences/:id
router.delete('/:id', experienceController.deleteExperience);

// GET /experiences/users/:userId  (pour récupérer expériences par utilisateur)
router.get('/users/:userId', experienceController.getExperiencesByUserId);

module.exports = router;
