const { NLPTool, User } = require('../models');

// Controller for handling NLP tool-related operations
const nlpToolController = {
  // Get all NLP tools
  getAllTools: async (req, res) => {
    try {
      const tools = await NLPTool.findAll({
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(tools);
    } catch (error) {
      console.error('Error fetching NLP tools:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific NLP tool by ID
  getToolById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const tool = await NLPTool.findByPk(id, {
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      if (!tool) {
        return res.status(404).json({ message: 'NLP tool not found' });
      }

      return res.status(200).json(tool);
    } catch (error) {
      console.error('Error fetching NLP tool:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a new NLP tool
  createTool: async (req, res) => {
    try {
      const { title, description, link } = req.body;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user
      
      // Validate required fields
      if (!title) {
        return res.status(400).json({ message: 'Tool title is required' });
      }

      if (!link) {
        return res.status(400).json({ message: 'Tool link is required' });
      }

      const newTool = await NLPTool.create({
        title,
        description,
        link,
        user_id
      });

      // Fetch the created tool with creator details
      const tool = await NLPTool.findByPk(newTool.id, {
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(201).json(tool);
    } catch (error) {
      console.error('Error creating NLP tool:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update an existing NLP tool
  updateTool: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, link } = req.body;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the tool
      const tool = await NLPTool.findByPk(id);

      if (!tool) {
        return res.status(404).json({ message: 'NLP tool not found' });
      }

      // Check if the user is the creator of the tool
      if (tool.user_id !== user_id) {
        return res.status(403).json({ message: 'Not authorized to update this tool' });
      }

      // Update the tool
      await tool.update({
        title: title || tool.title,
        description: description !== undefined ? description : tool.description,
        link: link || tool.link
      });

      // Fetch the updated tool with creator details
      const updatedTool = await NLPTool.findByPk(id, {
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(200).json(updatedTool);
    } catch (error) {
      console.error('Error updating NLP tool:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete an NLP tool
  deleteTool: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the tool
      const tool = await NLPTool.findByPk(id);

      if (!tool) {
        return res.status(404).json({ message: 'NLP tool not found' });
      }

      // Check if the user is the creator of the tool
      if (tool.user_id !== user_id) {
        return res.status(403).json({ message: 'Not authorized to delete this tool' });
      }

      // Delete the tool
      await tool.destroy();

      return res.status(200).json({ message: 'NLP tool deleted successfully' });
    } catch (error) {
      console.error('Error deleting NLP tool:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = nlpToolController;