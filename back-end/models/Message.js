const { db } = require('../config/firebase');

class Message {
    constructor(data) {
        this.id = data.id;
        this.sender_id = data.sender_id;
        this.receiver_id = data.receiver_id;
        this.content = data.content;
        this.is_read = data.is_read || false;
        this.created_at = data.created_at || new Date().toISOString();
    }

    static async create({ sender_id, receiver_id, content }) {
        try {
            // Convertir les IDs en strings pour assurer la cohérence
            sender_id = String(sender_id);
            receiver_id = String(receiver_id);

            console.log('Création d\'un message dans Firebase:', { sender_id, receiver_id, content });
            
            // Vérifier la connexion à Firebase
            const connected = await db.ref('.info/connected').once('value');
            if (!connected.val()) {
                throw new Error('Non connecté à Firebase');
            }

            const messageRef = db.ref('messages').push();
            const message = {
                id: messageRef.key,
                sender_id,
                receiver_id,
                content,
                is_read: false,
                created_at: new Date().toISOString()
            };

            console.log('Tentative d\'écriture dans Firebase:', message);
            await messageRef.set(message);
            console.log('Message créé avec succès dans Firebase');

            // Vérifier que le message a bien été écrit
            const writtenMessage = await messageRef.once('value');
            if (!writtenMessage.exists()) {
                throw new Error('Le message n\'a pas été correctement écrit dans Firebase');
            }

            return message;
        } catch (error) {
            console.error('Erreur détaillée lors de la création du message:', error);
            throw error;
        }
    }

    static async getConversation(userId1, userId2) {
        try {
            // Convertir les IDs en strings pour assurer la cohérence
            userId1 = String(userId1);
            userId2 = String(userId2);

            console.log('Récupération de la conversation entre:', userId1, userId2);
            
            // Vérifier la connexion à Firebase
            const connected = await db.ref('.info/connected').once('value');
            if (!connected.val()) {
                throw new Error('Non connecté à Firebase');
            }

            const messagesRef = db.ref('messages');
            const snapshot = await messagesRef.once('value');
            const messages = [];
            
            snapshot.forEach((childSnapshot) => {
                const message = childSnapshot.val();
                if ((message.sender_id === userId1 && message.receiver_id === userId2) ||
                    (message.sender_id === userId2 && message.receiver_id === userId1)) {
                    messages.push(message);
                }
            });
            
            console.log('Messages trouvés:', messages);
            return messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } catch (error) {
            console.error('Erreur détaillée lors de la récupération de la conversation:', error);
            throw error;
        }
    }

    static async markAsRead(senderId, receiverId) {
        try {
            // Convertir les IDs en strings pour assurer la cohérence
            senderId = String(senderId);
            receiverId = String(receiverId);

            console.log('Marquage des messages comme lus:', { senderId, receiverId });
            
            // Vérifier la connexion à Firebase
            const connected = await db.ref('.info/connected').once('value');
            if (!connected.val()) {
                throw new Error('Non connecté à Firebase');
            }

            const messagesRef = db.ref('messages');
            const snapshot = await messagesRef.once('value');
            
            const updates = {};
            snapshot.forEach((childSnapshot) => {
                const message = childSnapshot.val();
                if (message.sender_id === senderId && message.receiver_id === receiverId && !message.is_read) {
                    updates[`${childSnapshot.key}/is_read`] = true;
                }
            });
            
            if (Object.keys(updates).length > 0) {
                await messagesRef.update(updates);
                console.log('Messages marqués comme lus avec succès');
            } else {
                console.log('Aucun message à marquer comme lu');
            }
        } catch (error) {
            console.error('Erreur détaillée lors du marquage des messages comme lus:', error);
            throw error;
        }
    }
}

module.exports = Message; 