const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { authenticate, isAdmin, isModeratorOrAdmin } = require('../middlewares/authMiddleware');

// Public routes
// Get all forums
// GET /api/forums
router.get('/', forumController.getAllForums);

// Get a specific forum by ID
// GET /api/forums/:id
router.get('/:id', forumController.getForumById);

// Get all posts in a forum
// GET /api/forums/:id/posts
router.get('/:id/posts', forumController.getForumPosts);

// Protected routes (require authentication)
// Create a new forum
// POST /api/forums
router.post('/', authenticate, forumController.createForum);

// Update an existing forum
// PUT /api/forums/:id
router.put('/:id', authenticate, forumController.updateForum);

// Delete a forum
// DELETE /api/forums/:id
router.delete('/:id', authenticate, forumController.deleteForum);

module.exports = router;