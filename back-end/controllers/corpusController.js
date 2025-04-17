const { Corpus, User, CorpusFile, AnnotationFile } = require('../models');

// Controller for handling corpus-related operations
const corpusController = {
  // Get all corpora
  getAllCorpora: async (req, res) => {
    try {
      const corpora = await Corpus.findAll({
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }],
        order: [['created_at', 'DESC']]
      });

      return res.status(200).json(corpora);
    } catch (error) {
      console.error('Error fetching corpora:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get a specific corpus by ID
  getCorpusById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const corpus = await Corpus.findByPk(id, {
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'full_name']
          },
          {
            model: CorpusFile,
            as: 'files'
          },
          {
            model: AnnotationFile,
            as: 'annotations'
          }
        ]
      });

      if (!corpus) {
        return res.status(404).json({ message: 'Corpus not found' });
      }

      return res.status(200).json(corpus);
    } catch (error) {
      console.error('Error fetching corpus:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create a new corpus
  createCorpus: async (req, res) => {
    try {
      const { title, description } = req.body;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user
      
      // Validate required fields
      if (!title) {
        return res.status(400).json({ message: 'Corpus title is required' });
      }

      const newCorpus = await Corpus.create({
        title,
        description,
        user_id
      });

      // Fetch the created corpus with creator details
      const corpus = await Corpus.findByPk(newCorpus.id, {
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(201).json(corpus);
    } catch (error) {
      console.error('Error creating corpus:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Update an existing corpus
  updateCorpus: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the corpus
      const corpus = await Corpus.findByPk(id);

      if (!corpus) {
        return res.status(404).json({ message: 'Corpus not found' });
      }

      // Check if the user is the creator of the corpus
      if (corpus.user_id !== user_id) {
        return res.status(403).json({ message: 'Unauthorized: You can only update your own corpora' });
      }

      // Update the corpus
      await corpus.update({
        title: title || corpus.title,
        description: description !== undefined ? description : corpus.description
      });

      // Fetch the updated corpus with creator details
      const updatedCorpus = await Corpus.findByPk(id, {
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'full_name']
        }]
      });

      return res.status(200).json(updatedCorpus);
    } catch (error) {
      console.error('Error updating corpus:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete a corpus
  deleteCorpus: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // Assuming user is authenticated and available in req.user

      // Find the corpus
      const corpus = await Corpus.findByPk(id);

      if (!corpus) {
        return res.status(404).json({ message: 'Corpus not found' });
      }

      // Check if the user is the creator of the corpus or an admin
      if (corpus.user_id !== user_id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized: You can only delete your own corpora' });
      }

      // Delete the corpus
      await corpus.destroy();

      return res.status(200).json({ message: 'Corpus deleted successfully' });
    } catch (error) {
      console.error('Error deleting corpus:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = corpusController;