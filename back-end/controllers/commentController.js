const { Comment, User, Post, Project, Event, NlpTool, Corpus } = require('../models');
const NotificationService = require('../services/notificationService');

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
          entity_id: entityId,
          parent_id: null // Only get top-level comments
        },
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'full_name']
          },
          {
            model: Comment,
            as: 'replies',
            include: [{
              model: User,
              as: 'author',
              attributes: ['id', 'username', 'full_name']
            }]
          }
        ],
        order: [
          ['created_at', 'DESC'],
          [{ model: Comment, as: 'replies' }, 'created_at', 'ASC']
        ]
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
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'full_name']
          },
          {
            model: Comment,
            as: 'replies',
            include: [{
              model: User,
              as: 'author',
              attributes: ['id', 'username', 'full_name']
            }]
          }
        ]
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
      const { entity_type, entity_id, content, image, parent_id } = req.body;
      const user_id = req.user.id;
      
      // Validate entity type
      if (!['post', 'project', 'event', 'nlp_tool', 'corpus', 'course'].includes(entity_type)) {
        return res.status(400).json({ message: 'Invalid entity type' });
      }

      // Validate required fields
      if (!content) {
        return res.status(400).json({ message: 'Comment content is required' });
      }

      // If this is a reply, verify the parent comment exists
      if (parent_id) {
        const parentComment = await Comment.findByPk(parent_id);
        if (!parentComment) {
          return res.status(404).json({ message: 'Parent comment not found' });
        }
      }

      const newComment = await Comment.create({
        entity_type,
        entity_id,
        content,
        image,
        user_id,
        parent_id
      });

      // Fetch the created comment with author details
      const comment = await Comment.findByPk(newComment.id, {
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      // Initialize NotificationService
      const notificationService = new NotificationService(req.app.get('io'));

      // If this is a reply, notify the parent comment's author
      if (parent_id) {
        const parentComment = await Comment.findByPk(parent_id, {
          include: [{
            model: User,
            as: 'author'
          }]
        });
        
        if (parentComment && parentComment.author.id !== user_id) {
          await notificationService.handleCommentReply(
            entity_id,
            user_id,
            parentComment.author.id,
            comment
          );
        }
      } else {
        // For new comments, notify the entity owner
        // You'll need to implement this based on your entity types
        // This is a placeholder - implement the actual logic based on your needs
        const entityOwnerId = await getEntityOwnerId(entity_type, entity_id);
        if (entityOwnerId && entityOwnerId !== user_id) {
          await notificationService.handleNewComment(
            entity_id,
            user_id,
            entityOwnerId,
            comment
          );
        }
      }

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
      const user_id = req.user.id;

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
      const user_id = req.user.id;

      // Find the comment
      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Check if the user is the author of the comment or an admin/moderator
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

// Helper function to get entity owner ID
async function getEntityOwnerId(entityType, entityId) {
  try {
    switch (entityType) {
      case 'post':
        const post = await Post.findByPk(entityId);
        return post?.user_id;
      case 'project':
        const project = await Project.findByPk(entityId);
        return project?.user_id;
      case 'event':
        const event = await Event.findByPk(entityId);
        return event?.user_id;
      case 'nlp_tool':
        const nlpTool = await NlpTool.findByPk(entityId);
        return nlpTool?.user_id;
      case 'corpus':
        const corpus = await Corpus.findByPk(entityId);
        return corpus?.user_id;
      // Add other entity types as needed
      default:
        return null;
    }
  } catch (error) {
    console.error('Error getting entity owner:', error);
    return null;
  }
}

module.exports = commentController;