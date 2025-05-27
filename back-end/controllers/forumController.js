const { Forum, User, Post, ForumMember } = require('../models');
const NotificationService = require('../services/notificationService');

// Controller for handling forum-related operations
const forumController = {
  // Get all forums
  getAllForums: async (req, res) => {
    try {
      const forums = await Forum.findAll({
        include: [{
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'full_name']
        }],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(forums);
    } catch (error) {
      console.error('Error fetching forums:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific forum by ID
  getForumById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const forum = await Forum.findByPk(id, {
        include: [{
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      if (!forum) {
        return res.status(404).json({ message: 'Forum not found' });
      }

      return res.status(200).json(forum);
    } catch (error) {
      console.error('Error fetching forum:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a new forum
  createForum: async (req, res) => {
    try {
      const { name, description, photo, topic, visibility } = req.body;
      const owner_id = req.user.id;
      
      // Validate required fields
      if (!name) {
        return res.status(400).json({ message: 'Forum name is required' });
      }

      // Check if forum with the same name already exists
      const existingForum = await Forum.findOne({ where: { name } });
      if (existingForum) {
        return res.status(400).json({ message: 'A forum with this name already exists' });
      }

      // Create new forum
      const newForum = await Forum.create({
        name,
        description,
        photo,
        topic,
        visibility: visibility || 'public',
        owner_id
      });

      // Add owner as a member
      await ForumMember.create({
        forum_id: newForum.id,
        user_id: owner_id,
        role: 'owner'
      });

      // Fetch the created forum with owner details
      const forum = await Forum.findByPk(newForum.id, {
        include: [{
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(201).json(forum);
    } catch (error) {
      console.error('Error creating forum:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update an existing forum
  updateForum: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, photo, topic, visibility } = req.body;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the forum
      const forum = await Forum.findByPk(id);

      if (!forum) {
        return res.status(404).json({ message: 'Forum not found' });
      }

      // Check if the user is the owner of the forum or an admin
      if (forum.owner_id !== user_id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: You can only update forums you own' });
      }

      // If name is being updated, check if it's unique
      if (name && name !== forum.name) {
        const existingForum = await Forum.findOne({ where: { name } });
        if (existingForum) {
          return res.status(400).json({ message: 'A forum with this name already exists' });
        }
      }

      // Update the forum
      await forum.update({
        name: name || forum.name,
        description: description !== undefined ? description : forum.description,
        photo: photo !== undefined ? photo : forum.photo,
        topic: topic !== undefined ? topic : forum.topic,
        visibility: visibility || forum.visibility
      });

      // Fetch the updated forum with owner details
      const updatedForum = await Forum.findByPk(id, {
        include: [{
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(200).json(updatedForum);
    } catch (error) {
      console.error('Error updating forum:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete a forum
  deleteForum: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the forum
      const forum = await Forum.findByPk(id);

      if (!forum) {
        return res.status(404).json({ message: 'Forum not found' });
      }

      // Check if the user is the owner of the forum or an admin
      if (forum.owner_id !== user_id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: You can only delete forums you own' });
      }

      // Delete the forum
      await forum.destroy();

      return res.status(200).json({ message: 'Forum deleted successfully' });
    } catch (error) {
      console.error('Error deleting forum:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get all posts in a forum
  getForumPosts: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if forum exists
      const forum = await Forum.findByPk(id);
      if (!forum) {
        return res.status(404).json({ message: 'Forum not found' });
      }

      // Get posts
      const posts = await Post.findAll({
        where: { forum_id: id },
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'full_name']
        }],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching forum posts:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Join a forum
  joinForum: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id;

      // Check if forum exists
      const forum = await Forum.findByPk(id, {
        include: [{
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      if (!forum) {
        return res.status(404).json({ message: 'Forum not found' });
      }

      // Check if user is already a member
      const existingMember = await ForumMember.findOne({
        where: {
          forum_id: id,
          user_id
        }
      });

      if (existingMember) {
        return res.status(400).json({ message: 'You are already a member of this forum' });
      }

      // Add user as a member
      await ForumMember.create({
        forum_id: id,
        user_id,
        role: 'member'
      });

      // Notify forum owner about new member
      if (forum.owner.id !== user_id) {
        const notificationService = new NotificationService(req.app.get('io'));
        await notificationService.handleNewForumMember(
          user_id,
          forum.id,
          forum.owner.id
        );
      }

      return res.status(200).json({ message: 'Successfully joined the forum' });
    } catch (error) {
      console.error('Error joining forum:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Leave a forum
  leaveForum: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id;

      // Check if forum exists
      const forum = await Forum.findByPk(id);
      if (!forum) {
        return res.status(404).json({ message: 'Forum not found' });
      }

      // Check if user is a member
      const member = await ForumMember.findOne({
        where: {
          forum_id: id,
          user_id
        }
      });

      if (!member) {
        return res.status(400).json({ message: 'You are not a member of this forum' });
      }

      // Prevent owner from leaving
      if (member.role === 'owner') {
        return res.status(400).json({ message: 'Forum owner cannot leave the forum' });
      }

      // Remove user from forum
      await member.destroy();

      return res.status(200).json({ message: 'Successfully left the forum' });
    } catch (error) {
      console.error('Error leaving forum:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = forumController;