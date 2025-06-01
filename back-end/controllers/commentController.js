const { Comment, User } = require('../models');
const NotificationService = require('../services/notificationService');
const { io } = require('../config/socketio'); // You'll need to make sure this file exists and exports io

const notificationService = new NotificationService(io);

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

      // Send notification based on whether this is a reply or a new comment
      if (parent_id) {
        // This is a reply to a comment
        const parentComment = await Comment.findByPk(parent_id);
        // Don't send notification if user is replying to their own comment
        if (parentComment.user_id !== user_id) {
          await notificationService.handleCommentReply(
            entity_id,
            user_id,
            parentComment.user_id,
            comment,
            entity_type // Add this parameter
          );
        }
      } else {
        // This is a new comment on an entity
        // You need to fetch the owner of the entity based on entity_type
        let entityOwnerId;
        
        // Get entity owner based on entity_type
        switch(entity_type) {
          case 'post':
            const Post = require('../models').Post;
            const post = await Post.findByPk(entity_id);
            entityOwnerId = post ? post.user_id : null;
            break;
          case 'project':
            const ProjectOwner = require('../models').ProjectOwner;
            const projectOwner = await ProjectOwner.findOne({ 
              where: { project_id: entity_id } 
            });
            entityOwnerId = projectOwner ? projectOwner.user_id : null;
            break;
          // Add cases for other entity types as needed
          case 'event':
            const Event = require('../models').Event;
            const event = await Event.findByPk(entity_id);
            entityOwnerId = event ? event.owner_id : null;
            break;
          case 'corpus':
            const Corpus = require('../models').Corpus;
            const corpus = await Corpus.findByPk(entity_id);
            entityOwnerId = corpus ? corpus.user_id : null;
            break;
          case 'course':
            const Course = require('../models').Course;
            const course = await Course.findByPk(entity_id);
            entityOwnerId = course ? course.user_id : null;
            break;
          case 'nlp_tool':
            const NLPTool = require('../models').NLPTool;
            const tool = await NLPTool.findByPk(entity_id);
            entityOwnerId = tool ? tool.user_id : null;
            break;
          case 'publication':
            const Publication = require('../models').Publication;
            const publication = await Publication.findByPk(entity_id);
            entityOwnerId = publication ? publication.user_id : null;
            break;
        }
        
        // Only send notification if the entity owner is not the commenter
        if (entityOwnerId && entityOwnerId !== user_id) {
          await notificationService.handleNewComment(
            entity_id,
            user_id,
            entityOwnerId,
            comment,
            entity_type // Add this parameter
          );
        }
      }

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

      // Keep track of old content for comparison
      const oldContent = comment.content;

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

      // Send notifications about the updated comment
      if (oldContent !== updatedComment.content) {
        // Check if this is a reply to a comment
        if (comment.parent_id) {
          const parentComment = await Comment.findByPk(comment.parent_id);
          // Notify parent comment author about the edited reply (if not self)
          if (parentComment && parentComment.user_id !== user_id) {
            await notificationService.handleCommentEdited(
              comment.entity_id,
              user_id,
              parentComment.user_id,
              updatedComment,
              comment.entity_type
            );
          }
        } else {
          // This is a top-level comment - determine the owner of the entity
          let entityOwnerId;
          
          switch(comment.entity_type) {
            case 'post':
              const Post = require('../models').Post;
              const post = await Post.findByPk(comment.entity_id);
              entityOwnerId = post ? post.user_id : null;
              break;
            case 'project':
              const ProjectOwner = require('../models').ProjectOwner;
              const projectOwner = await ProjectOwner.findOne({ 
                where: { project_id: comment.entity_id } 
              });
              entityOwnerId = projectOwner ? projectOwner.user_id : null;
              break;
            case 'event':
              const Event = require('../models').Event;
              const event = await Event.findByPk(comment.entity_id);
              entityOwnerId = event ? event.owner_id : null;
              break;
            case 'corpus':
              const Corpus = require('../models').Corpus;
              const corpus = await Corpus.findByPk(comment.entity_id);
              entityOwnerId = corpus ? corpus.user_id : null;
              break;
            case 'course':
              const Course = require('../models').Course;
              const course = await Course.findByPk(comment.entity_id);
              entityOwnerId = course ? course.user_id : null;
              break;
            case 'nlp_tool':
              const NLPTool = require('../models').NLPTool;
              const tool = await NLPTool.findByPk(comment.entity_id);
              entityOwnerId = tool ? tool.user_id : null;
              break;
            case 'publication':
              const Publication = require('../models').Publication;
              const publication = await Publication.findByPk(comment.entity_id);
              entityOwnerId = publication ? publication.user_id : null;
              break;
          }

          // Notify entity owner about the edited comment (if not self)
          if (entityOwnerId && entityOwnerId !== user_id) {
            await notificationService.handleCommentEdited(
              comment.entity_id,
              user_id,
              entityOwnerId,
              updatedComment,
              comment.entity_type
            );
          }
        }
      }

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
