const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');

// Get all projects
router.get('/', ProjectController.getAllProjects);

// Get a single project by ID
router.get('/:id', ProjectController.getProjectById);

// Create a new project
router.post('/', ProjectController.createProject);

// Update a project
router.put('/:id', ProjectController.updateProject);

// Delete a project
router.delete('/:id', ProjectController.deleteProject);

// Get projects by user ID
router.get('/user/:userId', ProjectController.getProjectsByUser);

// Add participant to project
router.post('/:id/participants', ProjectController.addParticipant);

// Remove participant from project
router.delete('/:id/participants/:userId', ProjectController.removeParticipant);

module.exports = router;