const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// Get all posts
router.get('/', PostController.getAllPosts);

// Get a single post by ID
router.get('/:id', PostController.getPostById);

// Create a new post
router.post('/', PostController.createPost);

// Update a post
router.put('/:id', PostController.updatePost);

// Delete a post
router.delete('/:id', PostController.deletePost);

module.exports = router;