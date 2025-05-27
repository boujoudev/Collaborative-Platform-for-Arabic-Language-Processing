const { Evaluation, User } = require('../models');

// Créer ou mettre à jour une évaluation
exports.createOrUpdateEvaluation = async (req, res) => {
  const { entity_type, entity_id, vote } = req.body;
  const user_id = req.user.id; // Assure-toi que l'utilisateur est authentifié

  try {
    // Crée ou met à jour la ligne (grâce à l'index unique sur entity_type/entity_id/user_id)
    const [evaluation, created] = await Evaluation.upsert({
      entity_type,
      entity_id,
      user_id,
      vote
    }, {
      returning: true
    });

    res.status(200).json({
      message: created ? 'Évaluation créée' : 'Évaluation mise à jour',
      evaluation
    });
  } catch (error) {
    console.error('Erreur lors de la création ou MAJ de l’évaluation:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Supprimer une évaluation
exports.deleteEvaluation = async (req, res) => {
  const { entity_type, entity_id } = req.params;
  const user_id = req.user.id;

  try {
    const deleted = await Evaluation.destroy({
      where: { entity_type, entity_id, user_id }
    });

    if (deleted) {
      return res.status(200).json({ message: 'Évaluation supprimée' });
    }

    res.status(404).json({ message: 'Évaluation introuvable' });
  } catch (error) {
    console.error('Erreur suppression évaluation:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer toutes les évaluations pour une entité donnée
exports.getEvaluationsByEntity = async (req, res) => {
  const { entity_type, entity_id } = req.params;

  try {
    const evaluations = await Evaluation.findAll({
      where: { entity_type, entity_id },
      include: [{ model: User, as: 'voter', attributes: ['id', 'username'] }]
    });

    res.status(200).json(evaluations);
  } catch (error) {
    console.error('Erreur récupération évaluations:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
