const Post = require('../models/Post');

class PostController {
    // Get all posts
    static async getAllPosts(req, res) {
        try {
            const posts = await Post.getAllPosts();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: `Error fetching posts: ${error.message}` });
        }
    }

    // Get a single post by ID
    static async getPostById(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ error: `Error fetching post: ${error.message}` });
        }
    }

    // Create a new post
    static async createPost(req, res) {
        try {
            const newPost = await Post.create(req.body);
            res.status(201).json(newPost);
        } catch (error) {
            res.status(400).json({ error: `Error creating post: ${error.message}` });
        }
    }

    // Update a post
    static async updatePost(req, res) {
        try {
            const updatedPost = await Post.update(req.params.id, req.body);
            if (!updatedPost) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: `Error updating post: ${error.message}` });
        }
    }

    // Delete a post
    static async deletePost(req, res) {
        try {
            const result = await Post.delete(req.params.id);
            if (!result) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: `Error deleting post: ${error.message}` });
        }
    }
}

module.exports = PostController;