const { ContactMe, User } = require('../models');

exports.createContact = async (req, res) => {
  try {
    const { portfolio, linkedin, email, phone, address, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Le champ "userId" est obligatoire.' });
    }

    const existingContact = await ContactMe.findOne({ where: { userId } });

    if (existingContact) {
      // Update existing contact
      await existingContact.update({ portfolio, linkedin, email, phone, address });
      return res.status(200).json({ message: 'Contact mis à jour.', contact: existingContact });
    }

    // Create new contact if none exists
    const newContact = await ContactMe.create({ portfolio, linkedin, email, phone, address, userId });
    res.status(201).json(newContact);

  } catch (error) {
    console.error('Erreur lors de la création/mise à jour du contact :', error);
    res.status(500).json({ error: 'Impossible de créer ou mettre à jour le contact.' });
  }
};


exports.updateContact = async (req, res) => {
  try {
    const userId = req.params.userId;  // attention ici, on utilise userId comme PK

    const contact = await ContactMe.findByPk(userId);

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
