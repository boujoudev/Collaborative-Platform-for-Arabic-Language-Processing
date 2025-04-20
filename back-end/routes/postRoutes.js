const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticate, isAdmin, isModeratorOrAdmin } = require('../middlewares/authMiddleware');

// Public routes
// Get all posts
// GET /api/posts
router.get('/', postController.getAllPosts);

// Get a specific post by ID
// GET /api/posts/:id
router.get('/:id', postController.getPostById);

// Get all comments for a post
// GET /api/posts/:id/comments
router.get('/:id/comments', postController.getPostComments);

// Get all evaluations for a post
// GET /api/posts/:id/evaluations
router.get('/:id/evaluations', postController.getPostEvaluations);

// Protected routes (require authentication)
// Create a new post
// POST /api/posts
router.post('/', authenticate, postController.createPost);

// Update an existing post
// PUT /api/posts/:id
router.put('/:id', authenticate, postController.updatePost);

// Delete a post
// DELETE /api/posts/:id
router.delete('/:id', authenticate, postController.deletePost);

module.exports = router;