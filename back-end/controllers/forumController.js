const { Forum, User, Post } = require('../models');

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
    const { name, description, topic, visibility } = req.body;
    const owner_id = req.user.id;

    if (!name) {
      return res.status(400).json({ message: 'Forum name is required' });
    }

    const existingForum = await Forum.findOne({ where: { name } });
    if (existingForum) {
      return res.status(400).json({ message: 'A forum with this name already exists' });
    }

    const photo = req.file ? `/uploads/forum_photos/${req.file.filename}` : null;

    const newForum = await Forum.create({
      name,
      description,
      photo,
      topic,
      visibility: visibility || 'public',
      owner_id
    });

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
  }
};

module.exports = forumController;