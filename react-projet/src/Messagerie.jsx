import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
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

async function fetchConversations() {
  try {
    const response = await fetch('http://localhost:3000/api/messages/conversations/all', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Erreur lors de la récupération des conversations');
    
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

    if (!response.ok) throw new Error('Erreur lors de la récupération des messages');
    
    const data = await response.json();
    return data.map(msg => ({
      ...msg,
      created_at: format(new Date(msg.created_at), 'HH:mm'),
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
      body: JSON.stringify({
        receiver_id: receiverId,
        content: content
      }),
    });

    if (!response.ok) throw new Error('Erreur lors de l\'envoi du message');
    return await response.json();
  } catch (error) {
    console.error('Erreur sendMessage:', error);
    return null;
  }
}

function Messagerie() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessenger, setSelectedMessenger] = useState(null); // ID du messager sélectionné
  const [newMessage, setNewMessage] = useState('');

  // Récupération des conversations
  useEffect(() => {
    async function loadConversations() {
      const fetchedConversations = await fetchConversations();
      setConversations(fetchedConversations);
    }
    loadConversations();
  }, []);

  // Récupération des messages pour un messager sélectionné
  useEffect(() => {
    if (selectedMessenger) {
      async function loadMessages() {
        try {
          console.log("Messager sélectionné :", selectedMessenger); // Debug
          const fetchedMessages = await fetchMessages(selectedMessenger);
          console.log("Messages récupérés :", fetchedMessages); // Debug
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Erreur lors du chargement des messages:', error);
        }
      }
      loadMessages();
    }
  }, [selectedMessenger]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedMessenger) return;

    try {
      const sentMessage = await sendMessage(selectedMessenger, newMessage);
      if (sentMessage) {
        // Mise à jour des messages
        setMessages(prev => [...prev, {
          ...sentMessage,
          created_at: format(new Date(), 'HH:mm')
        }]);

        // Mise à jour de la dernière conversation
        setConversations(prev => 
          prev.map(conv => 
            conv.id === selectedMessenger 
              ? { 
                  ...conv, 
                  last_message: {
                    content: newMessage,
                    created_at: new Date().toISOString()
                  }
                } 
              : conv
          )
        );
        
        setNewMessage('');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className='messagerie-container'>
      <header className='main-header'>
        <div className='main-header-left'>
          <span>Chats</span>
          <button className='newchat-button'>
            <img className='img-button' src={newChat} alt="new chat" />
          </button>
        </div>
        <div className='main-header-right'>
          <button className='header-button'>
            <img className='img-button' src={infoButton} alt="info button" />
          </button>
          <button className='header-button'>
            <img className='img-button' src={closeButton} alt="close button" />
          </button>
        </div>
      </header>


 <div className='conv-container'>
        <div className='left-side'>
          {conversations.map(conv => (
            <div 
              key={conv.id} 
              className={`conv ${selectedMessenger === conv.user.id ? 'selected' : ''}`}
              onClick={() => setSelectedMessenger(conv.user.id)} // Utiliser l'ID du messager
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
            <button className='header-button'>
              <img src={settingsButton} alt="settings button" />
            </button>
          </header>

          <main className='main-right-side'>
            {messages.length > 0 ? (
              messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`message ${msg.sender_id === selectedMessenger ? 'sent' : 'received'}`}
                >
                  <img src={picConv} alt="" />
                  <div className='message-droite'>
                    <div className='message-span'>
                      <span>{msg.sender.full_name}</span>
                      <span>{msg.created_at}</span>
                    </div>
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-messages">Aucun message dans cette conversation.</p>
            )}
          </main>

          <footer className='footer-right-side'>
            <button className='footer-button'>
              <img src={cameraButton} alt="" />
            </button>
            <div className='square-msg'>
              <textarea
                placeholder='Message'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <div className='footer-button-container'>
                <button className='footer-button'>
                  <img src={gifButton} alt="" />
                </button>
                <button className='footer-button'>
                  <img src={emojiButton} alt="" />
                </button>
              </div>
            </div>
            <button className='footer-button' onClick={handleSend}>
              <img src={sendButton} alt="" />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Messagerie;