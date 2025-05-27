const { Publication, User } = require('../models');

const publicationController = {
  // Get all publications
  getAll: async (req, res) => {
    try {
      const publications = await Publication.findAll({
        include: {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'full_name']
        },
        order: [['uploaded_at', 'DESC']]
      });
      res.status(200).json(publications);
    } catch (error) {
      console.error('Error fetching publications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Get publication by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const publication = await Publication.findByPk(id, {
        include: {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'full_name']
        }
      });

      if (!publication) {
        return res.status(404).json({ message: 'Publication not found' });
      }

      res.status(200).json(publication);
    } catch (error) {
      console.error('Error fetching publication:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Create new publication
// Create new publication
create: async (req, res) => {
  try {
    const { title, description, publication_type } = req.body;
    const user_id = req.user.id;
    const file_path = req.file ? req.file.filename : null;

    if (!title || !publication_type || !file_path) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const publication = await Publication.create({
      title,
      description,
      publication_type,
      file_path,
      user_id
    });

    res.status(201).json(publication);
  } catch (error) {
    console.error('Error creating publication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
},



  // Update publication
update: async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, publication_type } = req.body;
    const user_id = req.user.id;
    const file_path = req.file ? req.file.path : undefined;

    const publication = await Publication.findByPk(id);
    if (!publication) return res.status(404).json({ message: 'Publication not found' });

    if (publication.user_id !== user_id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await publication.update({
      title: title || publication.title,
      description: description || publication.description,
      publication_type: publication_type || publication.publication_type,
      file_path: file_path || publication.file_path
    });

    res.status(200).json(publication);
  } catch (error) {
    console.error('Error updating publication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
},


  // Delete publication
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id;

      const publication = await Publication.findByPk(id);

      if (!publication) {
        return res.status(404).json({ message: 'Publication not found' });
      }

      if (publication.user_id !== user_id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      await publication.destroy();
      res.status(200).json({ message: 'Publication deleted successfully' });
    } catch (error) {
      console.error('Error deleting publication:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = publicationController;
