const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// Get all comments
router.get('/', CommentController.getAllComments);

// Get a single comment by ID
router.get('/:id', CommentController.getCommentById);

// Create a new comment
router.post('/', CommentController.createComment);

// Update a comment
router.put('/:id', CommentController.updateComment);

// Delete a comment
router.delete('/:id', CommentController.deleteComment);

module.exports = router;