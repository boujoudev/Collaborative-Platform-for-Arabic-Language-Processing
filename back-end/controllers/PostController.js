const { Post, User, Forum, Comment, Evaluation } = require('../models');

// Controller for handling post-related operations
const postController = {
  // Get all posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'full_name']
          },
          {
            model: Forum,
            as: 'forum',
            attributes: ['id', 'name']
          }
        ],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific post by ID
  getPostById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const post = await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'full_name']
          },
          {
            model: Forum,
            as: 'forum',
            attributes: ['id', 'name']
          }
        ]
      });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a new post
  createPost: async (req, res) => {
    try {
      const { forum_id, title, content, photo } = req.body;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user
      
      // Validate required fields
      if (!forum_id || !title || !content) {
        return res.status(400).json({ message: 'Forum ID, title, and content are required' });
      }

      // Check if forum exists
      const forum = await Forum.findByPk(forum_id);
      if (!forum) {
        return res.status(404).json({ message: 'Forum not found' });
      }

      // Create new post
      const newPost = await Post.create({
        forum_id,
        user_id,
        title,
        content,
        photo
      });

      // Fetch the created post with author and forum details
      const post = await Post.findByPk(newPost.id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'full_name']
          },
          {
            model: Forum,
            as: 'forum',
            attributes: ['id', 'name']
          }
        ]
      });

      return res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update an existing post
  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, photo } = req.body;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the post
      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Check if the user is the author of the post or an admin/moderator
      if (post.user_id !== user_id && req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return res.status(403).json({ message: 'Unauthorized: You can only update your own posts' });
      }

      // Update the post
      await post.update({
        title: title || post.title,
        content: content || post.content,
        photo: photo !== undefined ? photo : post.photo
      });

      // Fetch the updated post with author and forum details
      const updatedPost = await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'full_name']
          },
          {
            model: Forum,
            as: 'forum',
            attributes: ['id', 'name']
          }
        ]
      });

      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete a post
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the post
      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Check if the user is the author of the post or an admin/moderator
      if (post.user_id !== user_id && req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return res.status(403).json({ message: 'Unauthorized: You can only delete your own posts' });
      }

      // Delete the post
      await post.destroy();

      return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get all comments for a post
  getPostComments: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if post exists
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Get comments
      const comments = await Comment.findAll({
        where: {
          entity_type: 'post',
          entity_id: id
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
      console.error('Error fetching post comments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get all evaluations (votes) for a post
  getPostEvaluations: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if post exists
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Get evaluations
      const evaluations = await Evaluation.findAll({
        where: {
          entity_type: 'post',
          entity_id: id
        },
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'full_name']
        }],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(evaluations);
    } catch (error) {
      console.error('Error fetching post evaluations:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = postController;