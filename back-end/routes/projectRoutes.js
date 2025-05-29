const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Middleware for authentication
const { authenticate } = require('../middlewares/authMiddleware');

// Get all projects
// GET /api/projects
router.get('/', projectController.getAllProjects);

// Get projects by status
// GET /api/projects/status/:status
router.get('/status/:status', projectController.getProjectsByStatus);

// Get a specific project by ID
// GET /api/projects/:id
router.get('/:id', projectController.getProjectById);

// Create a new project (requires authentication)
// POST /api/projects
router.post('/', authenticate, projectController.createProject);

// Update an existing project (requires authentication)
// PUT /api/projects/:id
router.put('/:id', authenticate, projectController.updateProject);

// Delete a project (requires authentication)
// DELETE /api/projects/:id
router.delete('/:id', authenticate, projectController.deleteProject);

// Add a participant to a project (requires authentication)
// POST /api/projects/:id/participants
router.post('/:id/participants', authenticate, projectController.addParticipant);

// Remove a participant from a project (requires authentication)
// DELETE /api/projects/:id/participants/:userId
router.delete('/:id/participants/:userId', authenticate, projectController.removeParticipant);

// Request to join a project (requires authentication)
// POST /api/projects/:id/join
router.post('/:id/join', authenticate, projectController.requestToJoin);

// Handle join request (requires authentication)
// PUT /api/projects/:id/requests/:requestId
router.put('/:id/requests/:requestId', authenticate, projectController.handleJoinRequest);

// Get all join requests for a project (requires authentication)
// GET /api/projects/:id/requests
router.get('/:id/requests', authenticate, projectController.getJoinRequests);

// Withdraw a join request (requires authentication)
// DELETE /api/projects/:id/requests/withdraw
router.delete('/:id/requests/withdraw', authenticate, projectController.withdrawJoinRequest);


router.get('/:id/has-requested', authenticate, projectController.hasRequestedToJoin);


module.exports = router;