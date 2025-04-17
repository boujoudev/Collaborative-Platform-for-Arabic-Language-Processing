const { Comment, User } = require('../models');

// Controller for handling comment-related operations
const commentController = {
  // Get all comments for a specific entity (post, project, event, etc.)
  getCommentsByEntity: async (req, res) => {
    try {
      const { entityType, entityId } = req.params;
      
      // Validate entity type
      if (!['post', 'project', 'event', 'nlp_tool', 'corpus', 'course'].includes(entityType)) {
        return res.status(400).json({ message: 'Invalid entity type' });
      }

      const comments = await Comment.findAll({
        where: {
          entity_type: entityType,
          entity_id: entityId
        },
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'full_name']
        }],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific comment by ID
  getCommentById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const comment = await Comment.findByPk(id, {
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      return res.status(200).json(comment);
    } catch (error) {
      console.error('Error fetching comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a new comment
  createComment: async (req, res) => {
    try {
      const { entity_type, entity_id, content, image } = req.body;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user
      
      // Validate entity type
      if (!['post', 'project', 'event', 'nlp_tool', 'corpus', 'course'].includes(entity_type)) {
        return res.status(400).json({ message: 'Invalid entity type' });
      }

      // Validate required fields
      if (!content) {
        return res.status(400).json({ message: 'Comment content is required' });
      }

      const newComment = await Comment.create({
        entity_type,
        entity_id,
        content,
        image,
        user_id
      });

      // Fetch the created comment with author details
      const comment = await Comment.findByPk(newComment.id, {
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(201).json(comment);
    } catch (error) {
      console.error('Error creating comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update an existing comment
  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { content, image } = req.body;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the comment
      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Check if the user is the author of the comment
      if (comment.user_id !== user_id) {
        return res.status(403).json({ message: 'Unauthorized: You can only update your own comments' });
      }

      // Update the comment
      await comment.update({
        content: content || comment.content,
        image: image !== undefined ? image : comment.image
      });

      // Fetch the updated comment with author details
      const updatedComment = await Comment.findByPk(id, {
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(200).json(updatedComment);
    } catch (error) {
      console.error('Error updating comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete a comment
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the comment
      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Check if the user is the author of the comment or an admin/moderator
      // This would require checking user role, which we'd get from req.user
      if (comment.user_id !== user_id && req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return res.status(403).json({ message: 'Unauthorized: You can only delete your own comments' });
      }

      // Delete the comment
      await comment.destroy();

      return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = commentController;