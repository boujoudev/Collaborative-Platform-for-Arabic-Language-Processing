const { Formation, User } = require('../models');

// Créer une formation
exports.createFormation = async (req, res) => {
  try {
    const { diploma, university, start_year, end_year, userId } = req.body;

    if (!diploma || !university || !start_year || !end_year || !userId) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const formation = await Formation.create({ diploma, university, start_year, end_year, userId });

    res.status(201).json(formation);
  } catch (error) {
    console.error('Erreur lors de la création :', error);
    res.status(500).json({ error: 'Échec de la création de la formation.' });
  }
};

// Récupérer toutes les formations
exports.getAllFormations = async (req, res) => {
  try {
    const formations = await Formation.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'full_name', 'email']
      }]
    });

    res.status(200).json(formations);
  } catch (error) {
    console.error('Erreur lors de la récupération :', error);
    res.status(500).json({ error: 'Échec de la récupération des formations.' });
  }
};

// Récupérer une formation par ID
exports.getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'full_name', 'email']
      }]
    });

    if (!formation) {
      return res.status(404).json({ error: 'Formation introuvable.' });
    }

    res.status(200).json(formation);
  } catch (error) {
    console.error('Erreur lors de la récupération par ID :', error);
    res.status(500).json({ error: 'Échec de la récupération de la formation.' });
  }
};

// Récupérer les formations par userId
exports.getFormationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const formations = await Formation.findAll({
      where: { userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'full_name', 'email']
      }]
    });

    if (!formations.length) {
      return res.status(404).json({ message: 'Aucune formation trouvée pour cet utilisateur.' });
    }

    res.status(200).json(formations);
  } catch (error) {
    console.error('Erreur lors de la récupération par userId :', error);
    res.status(500).json({ error: 'Échec de la récupération des formations.' });
  }
};

// Mettre à jour une formation
exports.updateFormation = async (req, res) => {
  try {
    const formation = await Formation.findByPk(req.params.id);

    if (!formation) {
      return res.status(404).json({ error: 'Formation introuvable.' });
    }

    const updated = await formation.update(req.body);

    res.status(200).json(updated);
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
    res.status(500).json({ error: 'Échec de la mise à jour de la formation.' });
  }
};

// Supprimer une formation
exports.deleteFormation = async (req, res) => {
  try {
    const formation = await Formation.findByPk(req.params.id);

    if (!formation) {
      return res.status(404).json({ error: 'Formation introuvable.' });
    }

    await formation.destroy();

    res.status(200).json({ message: 'Formation supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    res.status(500).json({ error: 'Échec de la suppression de la formation.' });
  }
};
