const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Middleware for authentication (to be implemented)
const { authenticate } = require('../middlewares/authMiddleware');

// Get all comments for a specific entity (post, project, event, etc.)
// GET /api/comments/:entityType/:entityId
router.get('/:entityType/:entityId', commentController.getCommentsByEntity);

// Get a specific comment by ID
// GET /api/comments/:id
router.get('/:id', commentController.getCommentById);

// Create a new comment (requires authentication)
// POST /api/comments
router.post('/', authenticate, commentController.createComment);

// Update an existing comment (requires authentication)
// PUT /api/comments/:id
router.put('/:id', authenticate, commentController.updateComment);

// Delete a comment (requires authentication)
// DELETE /api/comments/:id
router.delete('/:id', authenticate, commentController.deleteComment);

module.exports = router;