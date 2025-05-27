const Message = require('../models/Message');
const { User } = require('../models');
const NotificationService = require('../services/notificationService');

const messageController = {
    // Envoyer un message
    sendMessage: async (req, res) => {
        try {
            const { receiver_id, content } = req.body;
            const sender_id = req.user.id;

            console.log('Tentative d\'envoi de message:', { sender_id, receiver_id, content });

            if (!receiver_id || !content) {
                return res.status(400).json({ error: 'Le destinataire et le contenu du message sont requis' });
            }

            // Vérifier si le destinataire existe
            const receiver = await User.findByPk(receiver_id);
            if (!receiver) {
                return res.status(404).json({ error: 'Destinataire non trouvé' });
            }

            // Vérifier si l'utilisateur n'essaie pas de s'envoyer un message à lui-même
            if (sender_id === receiver_id) {
                return res.status(400).json({ error: 'Vous ne pouvez pas vous envoyer un message à vous-même' });
            }

            // Créer le message
            const message = await Message.create({
                sender_id,
                receiver_id,
                content
            });

            console.log('Message créé avec succès:', message);

            // Récupérer les informations des utilisateurs
            const sender = await User.findByPk(sender_id, {
                attributes: ['id', 'full_name', 'username']
            });

            const response = {
                ...message,
                sender: sender,
                receiver: {
                    id: receiver.id,
                    full_name: receiver.full_name,
                    username: receiver.username
                }
            };

            // Send notification to receiver
            const notificationService = new NotificationService(req.app.get('io'));
            await notificationService.handleNewMessage(
                sender_id,
                receiver_id,
                {
                    id: message.id,
                    content: message.content,
                    senderName: sender.full_name
                }
            );

            res.status(201).json(response);
        } catch (error) {
            console.error('Erreur détaillée lors de l\'envoi du message:', error);
            res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
        }
    },

    // Obtenir la conversation avec un utilisateur
    getConversation: async (req, res) => {
        try {
            const { userId } = req.params;
            const currentUserId = req.user.id;

            console.log('Tentative de récupération de conversation:', { currentUserId, userId });

            if (!userId) {
                return res.status(400).json({ error: 'L\'ID de l\'utilisateur est requis' });
            }

            // Vérifier si l'utilisateur existe
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // Récupérer la conversation
            const messages = await Message.getConversation(currentUserId, userId);
            console.log('Messages récupérés:', messages);

            // Récupérer les informations des utilisateurs
            const currentUser = await User.findByPk(currentUserId, {
                attributes: ['id', 'full_name', 'username']
            });

            const otherUser = await User.findByPk(userId, {
                attributes: ['id', 'full_name', 'username']
            });

            // Marquer les messages comme lus
            await Message.markAsRead(userId, currentUserId);

            // Enrichir les messages avec les informations des utilisateurs
            const enrichedMessages = messages.map(message => ({
                ...message,
                sender: message.sender_id === currentUserId ? currentUser : otherUser,
                receiver: message.receiver_id === currentUserId ? currentUser : otherUser
            }));

            console.log('Messages enrichis:', enrichedMessages);

            res.json(enrichedMessages);
        } catch (error) {
            console.error('Erreur détaillée lors de la récupération de la conversation:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de la conversation' });
        }
    }
};

module.exports = messageController; 