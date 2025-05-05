import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import EmojiPicker from 'emoji-picker-react'; // Importer Emoji Picker
import newChat from './assets/chat-new-svgrepo-com.svg';
import infoButton from './assets/info-circle-svgrepo-com.svg';
import closeButton from './assets/close-lg-svgrepo-com.svg';
import sendButton from './assets/send-alt-1-svgrepo-com.svg';
import emojiButton from './assets/emoji-smile-svgrepo-com.svg';
import gifButton from './assets/gif-svgrepo-com.svg';
import cameraButton from './assets/camera-svgrepo-com.svg';
import settingsButton from './assets/settings-svgrepo-com.svg';
import picConv from "./assets/IMG_20241127_173103_809.jpg";
import './Messagerie.css';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJSYXlhbl91c21hIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MTI4MDYsImV4cCI6MTc0NjQ5OTIwNn0.D3NXxqBgH3T1rK-mMNDmeUR_PpoFEXhkO99__TEr1hw';
const decodedToken = jwtDecode(token);
const currentUser = {
  id: decodedToken.id.toString(),
  name: decodedToken.username
};

async function fetchConversations() {
  try {
    const response = await fetch('http://localhost:3000/api/messages/conversations/all', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Erreur récupération conversations');
    const data = await response.json();
    return data.map(conv => ({
      ...conv,
      timestamp: conv.last_message?.created_at || conv.created_at,
    }));
  } catch (error) {
    console.error('Erreur fetchConversations:', error);
    return [];
  }
}

async function fetchMessages(messengerId) {
  try {
    const response = await fetch(`http://localhost:3000/api/messages/${messengerId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Erreur récupération messages');
    const data = await response.json();
    return data.map(msg => ({
      ...msg,
      created_at: format(new Date(msg.created_at), 'HH:mm'),
      sender: msg.sender_id === currentUser.id 
        ? { ...msg.sender, full_name: currentUser.name } 
        : msg.sender
    }));
  } catch (error) {
    console.error('Erreur fetchMessages:', error);
    return [];
  }
}

async function sendMessage(receiverId, content) {
  try {
    const response = await fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ receiver_id: receiverId, content }),
    });
    if (!response.ok) throw new Error('Erreur envoi message');
    return await response.json();
  } catch (error) {
    console.error('Erreur sendMessage:', error);
    return null;
  }
}

function Messagerie() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessenger, setSelectedMessenger] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // État pour afficher ou masquer l'Emoji Picker

  useEffect(() => {
    const loadConversations = async () => {
      const fetchedConversations = await fetchConversations();
      setConversations(fetchedConversations);
    };
    loadConversations();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedMessenger) {
        const fetchedMessages = await fetchMessages(selectedMessenger);
        setMessages(fetchedMessages);
      }
    };
    loadMessages();
  }, [selectedMessenger]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedMessenger) return;
    try {
      const sentMessage = await sendMessage(selectedMessenger, newMessage);
      if (sentMessage) {
        // Ajouter le message à la liste des messages
        setMessages(prev => [...prev, {
          ...sentMessage,
          sender_id: currentUser.id,
          receiver_id: selectedMessenger,
          created_at: format(new Date(), 'HH:mm'),
          sender: { 
            id: currentUser.id, 
            full_name: currentUser.name
          }
        }]);

        // Rafraîchir la liste des conversations
        const updatedConversations = await fetchConversations();
        setConversations(updatedConversations);

        // Réinitialiser le champ de saisie
        setNewMessage('');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Gérer l'ajout d'un emoji
  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji); // Ajouter l'emoji au message
    setShowEmojiPicker(false); // Masquer l'Emoji Picker après sélection
  };

  return (
    
  <div className='messagerie-container'>
    <header className='main-header'>
      <div className='main-header-left'>
        <span>Chats</span>
        <button className='newchat-button'><img className='img-button' src={newChat} alt="new chat" /></button>
      </div>
      <div className='main-header-right'>
        <button className='header-button'><img className='img-button' src={infoButton} alt="info" /></button>
        <button className='header-button'><img className='img-button' src={closeButton} alt="close" /></button>
      </div>
    </header>

    <div className='conv-container'>
      <div className='left-side'>
        {conversations.map(conv => (
          <div 
            key={conv.id} 
            className={`conv ${selectedMessenger === conv.user.id ? 'selected' : ''}`}
            onClick={() => setSelectedMessenger(conv.user.id)}
          >
            <img src={picConv} alt="conversation" />
            <div className='conv-c'>
              <div className='conv-span'>
                <span>{conv.user.full_name}</span>
                <span>{format(new Date(conv.timestamp), 'HH:mm')}</span>
              </div>
              <p>{conv.last_message?.content || 'Nouvelle conversation'}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='right-side'>
        <header className='header-right-side'>
          <span className='name-conv'>
            {selectedMessenger 
              ? conversations.find(c => c.user.id === selectedMessenger)?.user.full_name
              : 'Sélectionnez une conversation'}
          </span>
          <button className='header-button'><img src={settingsButton} alt="settings" /></button>
        </header>

        <main className='main-right-side'>
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`message ${msg.sender_id === currentUser.id ? 'sent' : 'received'}`}
            >
              <img src={picConv} alt="" />
              <div className='message-droite'>
                <div className='message-span'>
                  <span>{msg.sender?.full_name || 'Utilisateur inconnu'}</span>
                  <span>{msg.created_at}</span>
                </div>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </main>

        <footer className='footer-right-side'>
          <button className='footer-button'><img src={cameraButton} alt="camera" /></button>
          <div className='square-msg'>
            <textarea
              placeholder='Message'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <div className='footer-button-container'>
              <button 
                className='footer-button' 
                onClick={() => setShowEmojiPicker((prev) => !prev)} // Afficher ou masquer l'Emoji Picker
              >
                <img src={emojiButton} alt="emoji" />
              </button>
              <button className='footer-button'><img src={gifButton} alt="gif" /></button>
            </div>
            {showEmojiPicker && (
              <div className="emoji-picker-container">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <button className='footer-button' onClick={handleSend}><img src={sendButton} alt="send" /></button>
        </footer>
      </div>
    </div>
  </div>
  );
}

export default Messagerie;