const Comment = require('../models/Comment');

class CommentController {
    // Get all comments
    static async getAllComments(req, res) {
        try {
            const comments = await Comment.getAllComments();
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: `Error fetching comments: ${error.message}` });
        }
    }
// coment/:id
    // Get a single comment by ID
    static async getCommentById(req,res) {
        try {
            const {id}= req.params
            id?id:console.log("no id provided")
            const comment = await Comment.findById(id);
            if (!comment) {
                throw new Error('Comment not found');
            }
            res.status(200).json(comment)
            return comment;
        } catch (error) {
            res.status(404).json({message:error.message})
        }
    }

    // Create a new comment
    static async createComment(req, res) {
        try {
            const commentData = req.body;
            const newComment = await Comment.create(commentData);
            res.status(201).json(newComment);
        } catch (error) {
            res.status(400).json({ message: `Error creating comment: ${error.message}` });
        }
    }

    // Update a comment
    static async updateComment(req, res) {
        try {
            const { id } = req.params;
            const commentData = req.body;
            const updatedComment = await Comment.update(id, commentData);
            if (!updatedComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json(updatedComment);
        } catch (error) {
            res.status(400).json({ message: `Error updating comment: ${error.message}` });
        }
    }

    // Delete a comment
    static async deleteComment(req, res) {
        try {
            const { id } = req.params;
            const result = await Comment.delete(id);
            if (!result) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: `Error deleting comment: ${error.message}` });
        }
    }
}

module.exports = CommentController;