const { Skill } = require('../models');

exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create skill' });
  }
};

exports.getAllSkills = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const skills = await Skill.findAll({
      where: { user_id: userId },
      include: [{
        model: require('../models').User,
        as: 'user',
        attributes: ['id', 'full_name']
      }]
    });
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id, {
      include: [{
        model: require('../models').User,
        as: 'user'
      }]
    });
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skill' });
  }
};

exports.getSkillsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const skills = await Skill.findAll({
      where: {
        user_id: userId
      },
      include: [{
        model: Skill.sequelize.models.User,
        as: 'user',
        attributes: ['id', 'full_name', 'username']
      }]
    });

    if (!skills.length) {
      return res.status(404).json({ message: 'No skills found for this user' });
    }

    res.status(200).json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    const updated = await skill.update(req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    await skill.destroy();
    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
};