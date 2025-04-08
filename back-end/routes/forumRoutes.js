const express = require('express');
const router = express.Router();
const ForumController = require('../controllers/ForumController');

// Get all posts
router.get('/', ForumController.getAllPosts);

// Get a single post by ID
router.get('/:id', ForumController.getPostById);

// Create a new post
router.post('/', ForumController.createPost);

// Update a post
router.put('/:id', ForumController.updatePost);

// Delete a post
router.delete('/:id', ForumController.deletePost);

module.exports = router;



