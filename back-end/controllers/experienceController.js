const { Experience } = require('../models');

exports.createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create experience' });
  }
};

exports.getAllExperiences = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const experiences = await Experience.findAll({
      where: { user_id: userId },
      include: [{
        model: require('../models').User,
        as: 'user',
        attributes: ['id', 'full_name', 'email']
      }]
    });
    res.status(200).json(experiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};

exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id, {
      include: [{
        model: require('../models').User,
        as: 'user'
      }]
    });
    if (!experience) return res.status(404).json({ error: 'Experience not found' });
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) return res.status(404).json({ error: 'Experience not found' });
    const updated = await experience.update(req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update experience' });
  }
};
exports.getExperiencesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const experiences = await Experience.findAll({
      where: {
        user_id: userId
      },
      include: [{
        model: Experience.sequelize.models.User,
        as: 'user',
        attributes: ['id', 'full_name', 'username']
      }]
    });

    if (!experiences.length) {
      return res.status(404).json({ message: 'No experiences found for this user' });
    }

    res.status(200).json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) return res.status(404).json({ error: 'Experience not found' });
    await experience.destroy();
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience' });
  }
};