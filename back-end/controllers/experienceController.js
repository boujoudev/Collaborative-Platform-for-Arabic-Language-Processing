const { Experience, User } = require('../models');

exports.createExperience = async (req, res) => {
  try {
    const { title, description, user_id, date } = req.body;
    console.log('Body reçu:', req.body);

    if (!title) {
      return res.status(400).json({ error: "Le champ 'title' est obligatoire." });
    }
    if (!user_id) {
      return res.status(400).json({ error: "Le champ 'user_id' est obligatoire." });
    }

    const experience = await Experience.create({ title, description, user_id, date });

    res.status(201).json(experience);
  } catch (error) {
    console.error('Erreur lors de la création:', error);
    res.status(500).json({ error: 'Failed to create experience' });
  }
};

exports.getAllExperiences = async (req, res) => {
  try {
    // Si tu veux toutes les expériences sans filtre, tu peux supprimer le userId
    const experiences = await Experience.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'full_name', 'email']
      }]
    });
    res.status(200).json(experiences);
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};

exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'full_name', 'email']
      }]
    });

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.status(200).json(experience);
  } catch (error) {
    console.error('Erreur lors de la récupération par ID:', error);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    // Met à jour uniquement les champs reçus dans req.body
    const updated = await experience.update(req.body);

    res.status(200).json(updated);
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    res.status(500).json({ error: 'Failed to update experience' });
  }
};

exports.getExperiencesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const experiences = await Experience.findAll({
      where: { user_id: userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'full_name', 'email']
      }]
    });

    if (experiences.length === 0) {
      return res.status(404).json({ message: 'No experiences found for this user' });
    }

    res.status(200).json(experiences);
  } catch (error) {
    console.error('Erreur lors de la récupération par userId:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    await experience.destroy();

    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    res.status(500).json({ error: 'Failed to delete experience' });
  }
};
