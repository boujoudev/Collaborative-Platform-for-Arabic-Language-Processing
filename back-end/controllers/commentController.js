const { Comment, User } = require('../models');

const validEntityTypes = ['post', 'project', 'event', 'nlp_tool', 'corpus', 'course', 'publication'];

const commentController = {
  getCommentsByEntity: async (req, res) => {
    try {
      const { entityType, entityId } = req.params;

      if (!validEntityTypes.includes(entityType)) {
        return res.status(400).json({ message: 'Invalid entity type' });
      }

      // Récupérer les commentaires racines (parent_id = null) + leurs réponses en incluant l'association 'replies'
      const comments = await Comment.findAll({
        where: {
          entity_type: entityType,
          entity_id: entityId,
          parent_id: null  // Seulement commentaires racines
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
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

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

  createComment: async (req, res) => {
    try {
      const { entity_type, entity_id, content, image, parent_id } = req.body;
      const user_id = req.user.id;

      if (!validEntityTypes.includes(entity_type)) {
        return res.status(400).json({ message: 'Invalid entity type' });
      }

      if (!content) {
        return res.status(400).json({ message: 'Comment content is required' });
      }

      // Si parent_id est défini, vérifier qu'il existe et appartient au même entity_type/entity_id
      if (parent_id) {
        const parentComment = await Comment.findByPk(parent_id);
        if (!parentComment) {
          return res.status(400).json({ message: 'Parent comment not found' });
        }
        if (parentComment.entity_type !== entity_type || parentComment.entity_id !== entity_id) {
          return res.status(400).json({ message: 'Parent comment entity mismatch' });
        }
      }

      const newComment = await Comment.create({
        entity_type,
        entity_id,
        content,
        image,
        user_id,
        parent_id: parent_id || null
      });

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

  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { content, image } = req.body;
      const user_id = req.user.id;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      if (comment.user_id !== user_id) {
        return res.status(403).json({ message: 'Unauthorized: You can only update your own comments' });
      }

      await comment.update({
        content: content || comment.content,
        image: image !== undefined ? image : comment.image
      });

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

  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      if (comment.user_id !== user_id && req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return res.status(403).json({ message: 'Unauthorized: You can only delete your own comments' });
      }

      await comment.destroy();

      return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = commentController;
