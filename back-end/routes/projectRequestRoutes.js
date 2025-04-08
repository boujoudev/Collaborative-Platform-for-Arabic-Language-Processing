const express = require('express');
const router = express.Router();
const ProjectRequestController = require('../controllers/ProjectRequestController');

// Get all project requests
router.get('/', ProjectRequestController.getAllProjectRequests);

// Get a single project request by ID
router.get('/:id', ProjectRequestController.getProjectRequestById);

// Create a new project request
router.post('/', ProjectRequestController.createProjectRequest);

// Update a project request
router.put('/:id', ProjectRequestController.updateProjectRequest);

// Delete a project request
router.delete('/:id', ProjectRequestController.deleteProjectRequest);

module.exports = router;