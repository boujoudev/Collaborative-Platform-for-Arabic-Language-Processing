const express = require('express');
const router = express.Router();
const ProjectFileController = require('../controllers/ProjectFileController');

// Get all project files
router.get('/', ProjectFileController.getAllProjectFiles);

// Get a single project file by ID
router.get('/:id', ProjectFileController.getProjectFileById);

// Create a new project file
router.post('/', ProjectFileController.createProjectFile);

// Update a project file
router.put('/:id', ProjectFileController.updateProjectFile);

// Delete a project file
router.delete('/:id', ProjectFileController.deleteProjectFile);

module.exports = router;