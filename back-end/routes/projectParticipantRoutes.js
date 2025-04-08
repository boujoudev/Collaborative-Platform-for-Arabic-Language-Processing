const express = require('express');
const router = express.Router();
const ProjectParticipantController = require('../controllers/ProjectParticipantController');

// Get all project participants
router.get('/', ProjectParticipantController.getAllProjectParticipants);

// Get participants by project ID
router.get('/project/:projectId', ProjectParticipantController.getParticipantsByProject);

// Get projects by participant ID
router.get('/user/:userId', ProjectParticipantController.getProjectsByParticipant);

// Add participant to project
router.post('/', ProjectParticipantController.addParticipant);

// Remove participant from project
router.delete('/:id', ProjectParticipantController.removeParticipant);

module.exports = router;