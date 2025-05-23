const { ContactMe, User } = require('../models');

exports.createContact = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    const { portfolio, linkedin, email, phone, address, userId } = req.body;

    if (!email || !userId) {
      return res.status(400).json({ error: 'Les champs "email" et "userId" sont obligatoires.' });
    }

    const contact = await ContactMe.create({ portfolio, linkedin, email, phone, address, userId });
    res.status(201).json(contact);
  } catch (error) {
    console.error('Erreur lors de la création du contact :', error);
    res.status(500).json({ error: 'Impossible de créer le contact.' });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await ContactMe.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact introuvable.' });
    }

    const updated = await contact.update(req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
    res.status(500).json({ error: 'Impossible de mettre à jour le contact.' });
  }
};

exports.getContactByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const contact = await ContactMe.findOne({
      where: { userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'full_name', 'email']
        }
      ]
    });

    if (!contact) {
      return res.status(404).json({ error: 'Aucun contact trouvé pour cet utilisateur.' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Erreur lors de la récupération du contact :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};
