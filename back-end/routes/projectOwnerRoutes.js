const express = require('express');
const router = express.Router();
const ProjectOwnerController = require('../controllers/ProjectOwnerController.js');

// Get all project owners
router.get('/', ProjectOwnerController.getAllProjectOwners);

// Get project owner by ID
router.get('/:id', ProjectOwnerController.getProjectOwnerById);

// Create new project owner
router.post('/', ProjectOwnerController.createProjectOwner);

// Update project owner
router.put('/:id', ProjectOwnerController.updateProjectOwner);

// Delete project owner
router.delete('/:id', ProjectOwnerController.deleteProjectOwner);

module.exports = router;