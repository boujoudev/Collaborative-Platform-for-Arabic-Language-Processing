import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import EmojiPicker from 'emoji-picker-react'; // Importer Emoji Picker
import { Grid } from '@giphy/react-components'; // Importer le composant Giphy
import { GiphyFetch } from '@giphy/js-fetch-api'; // Importer l'API Giphy
import newChat from './assets/new-chat-black.svg';
import newChatWhite from './assets/new-chat-white.svg';
import infoButton from './assets/info-circle-svgrepo-com.svg';
import closeButton from './assets/close-lg-svgrepo-com.svg';
import sendButton from './assets/send-alt-1-svgrepo-com.svg';
import emojiButton from './assets/emoji-smile-svgrepo-com.svg';
import gifButton from './assets/gif-svgrepo-com.svg';
import cameraButton from './assets/camera-svgrepo-com.svg';
import settingsButton from './assets/settings-svgrepo-com.svg';
import picConv from "./assets/IMG_20241127_173103_809.jpg";
import './Messagerie.css';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJyYW91ZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ3MDA2NTA1LCJleHAiOjE3NDcwOTI5MDV9.zMhmHBrVcwL5hQuvX0XseOPtDM0RE6pBNnrql-RnBn0';
const decodedToken = jwtDecode(token);
const currentUser = {
  id: decodedToken.id.toString(),
  name: decodedToken.username
};


const gf = new GiphyFetch('8b5dMlr5kEsICEvFEArtqKSVEIsKtSP0'); 

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
      created_at: msg.created_at, // Garde le timestamp complet
      display_time: format(new Date(msg.created_at), 'HH:mm'), // Ajoute un champ pour l'heure d'affichage
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

// Ajouter cette fonction helper
const isOnlyEmojis = (str) => {
  // Nouvelle regex qui exclut spécifiquement les chiffres
  const emojiRegex = /^[\p{Emoji}]+$/u;
  
  // Vérifie si la chaîne contient des chiffres
  const hasNumbers = /\d/.test(str);
  
  // Compte le nombre d'emojis
  const emojiCount = [...str.matchAll(/\p{Emoji}/gu)].length;
  
  // Retourne true seulement si :
  // 1. La chaîne contient uniquement des emojis
  // 2. Ne contient pas de chiffres
  // 3. Contient 5 emojis ou moins
  return emojiRegex.test(str) && !hasNumbers && emojiCount <= 5;
};

const wrapEmojisInSpans = (content) => {
  const emojiRegex = /(\p{Emoji})/gu;
  
  return content.split(emojiRegex).map((part, index) => {
    if (part.match(emojiRegex) && !/\d/.test(part)) {
      return <span key={index} className="emoji">{part}</span>;
    }
    return part;
  });
};

// Ajouter cette fonction pour calculer le temps écoulé
const getTimeElapsed = (timestamp) => {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  // Moins d'une minute
  if (diffInMinutes < 1) {
    return "Envoyé à l'instant";
  }
  // Minutes (1-59 minutes)
  if (diffInMinutes < 60) {
    if (diffInMinutes === 1) return "Envoyé il y a 1 min";
    return `Envoyé il y a ${diffInMinutes} min`;
  }
  // Heures (1-23 heures)
  if (diffInHours < 24) {
    if (diffInHours === 1) return "Envoyé il y a 1 h";
    return `Envoyé il y a ${diffInHours} h`;
  }
  // Jours
  if (diffInDays === 1) return "Envoyé il y a 1 j";
  return `Envoyé il y a ${diffInDays} j`;
};

// Ajouter cette fonction helper pour formater la date
const formatMessageDate = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString()) {
    return "Aujourd'hui";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Hier";
  } else {
    return format(date, 'd MMMM yyyy');
  }
};

function Messagerie() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessenger, setSelectedMessenger] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
  const [showGifPicker, setShowGifPicker] = useState(false); 
  // Ajouter une référence pour l'intervalle
  const pollingInterval = useRef(null);

  useEffect(() => {
    const loadConversations = async () => {
      const fetchedConversations = await fetchConversations();
      setConversations(fetchedConversations);
    };
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedMessenger) {
      // Charger les messages initialement
      const loadMessages = async () => {
        try {
          const fetchedMessages = await fetchMessages(selectedMessenger);
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Erreur lors du chargement des messages:', error);
        }
      };
      loadMessages();
      // Mettre en place le polling
      pollingInterval.current = setInterval(loadMessages, 1000); // Rafraîchir toutes les secondes
      // Nettoyer l'intervalle quand le composant est démonté ou quand selectedMessenger change
      return () => {
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
        }
      };
    }
  }, [selectedMessenger]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedMessenger) return;
    try {
      const sentMessage = await sendMessage(selectedMessenger, newMessage);
      if (sentMessage) {
        // Modifier cette partie pour inclure un timestamp complet
        setMessages(prev => [...prev, {
          ...sentMessage,
          sender_id: currentUser.id,
          receiver_id: selectedMessenger,
          // Utiliser un timestamp complet au lieu de juste l'heure
          created_at: new Date().toISOString(),
          // Ajouter display_time pour l'affichage de l'heure
          display_time: format(new Date(), 'HH:mm'),
          sender: { 
            id: currentUser.id, 
            full_name: currentUser.name
          }
        }]);

        const updatedConversations = await fetchConversations();
        setConversations(updatedConversations);

        setNewMessage('');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji); 
    setShowEmojiPicker(false); 
  };

  // Gérer l'ajout d'un GIF
  const handleGifClick = async (gif, e) => {
    e.preventDefault(); // Empêche la redirection vers le site de Giphy
    if (!selectedMessenger) return;
    try {
      // Envoyer le GIF via l'API
      const sentMessage = await sendMessage(selectedMessenger, gif.images.original.url);
      if (sentMessage) {
        // Ajouter le GIF directement à la liste des messages
        setMessages(prev => [...prev, { 
          ...sentMessage,
          sender_id: currentUser.id,
          receiver_id: selectedMessenger,
          created_at: format(new Date(), 'HH:mm'),
          content: gif.images.original.url, // URL du GIF
          sender: { 
            id: currentUser.id, 
            full_name: currentUser.name
          }
        }]);
        // Rafraîchir la liste des conversations
        const updatedConversations = await fetchConversations();
        setConversations(updatedConversations);
        // Masquer le sélecteur de GIFs
        setShowGifPicker(false);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du GIF :', error);
    }
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
                <p>
                  {conv.last_message ? (
                    conv.last_message.sender_id === currentUser.id ? (
                      <span className='envoye-il-ya'>
                        {getTimeElapsed(conv.last_message.created_at)}
                      </span>
                    ) : (
                      conv.last_message.content
                    )
                  ) : (
                    'Nouvelle conversation'
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='right-side'>
          {selectedMessenger ? (
            // Contenu normal quand une conversation est sélectionnée
            <>
              <header className='header-right-side'>
                <span className='name-conv'>
                  {conversations.find(c => c.user.id === selectedMessenger)?.user.full_name}
                </span>
                <button className='header-button'>
                  <img src={settingsButton} alt="settings" />
                </button>
              </header>
              <main className='main-right-side'>
                <div className="imessage">
                  {messages.map((msg, index) => {
                    // Vérifier si nous devons afficher la date
                    const showDate = index === 0 || 
                      new Date(msg.created_at).toDateString() !== 
                      new Date(messages[index - 1].created_at).toDateString();
                    return (
                      <React.Fragment key={msg.id}>
                        {showDate && (
                          <div className="message-date">
                            {formatMessageDate(msg.created_at)}
                          </div>
                        )}
                        <div>
                          {msg.content.startsWith('https://media.giphy.com/') || msg.content.includes('giphy.com') ? (
                            // Pour les GIFs
                            <div className={msg.sender_id === currentUser.id ? 'from-me' : 'from-them'}>
                              <img src={msg.content} alt="GIF" className="gif-message" />
                            </div>
                          ) : (
                            // Pour les messages texte
                            <p 
                              className={`
                                ${msg.sender_id === currentUser.id ? 'from-me' : 'from-them'}
                                ${isOnlyEmojis(msg.content) ? 'emoji-only' : ''}
                                ${messages[messages.indexOf(msg) + 1]?.sender_id === msg.sender_id ? 'no-tail' : ''}
                                ${messages[messages.indexOf(msg) - 1]?.sender_id === msg.sender_id ? 'margin-b_none' : ''}
                              `}
                            >
                              {isOnlyEmojis(msg.content) ? msg.content : wrapEmojisInSpans(msg.content)}
                            </p>
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
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
                    <button 
                      className='footer-button' 
                      onClick={() => setShowGifPicker((prev) => !prev)} // Afficher ou masquer le sélecteur de GIFs
                    >
                      <img src={gifButton} alt="gif" />
                    </button>
                  </div>
                  {showEmojiPicker && (
                    <div className="emoji-picker-container">
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                  {showGifPicker && (
                    <div className="gif-picker-container">
                      <Grid
                        width={300}
                        columns={3}
                        fetchGifs={(offset) => gf.trending({ offset, limit: 10 })}
                        onGifClick={(gif, e) => handleGifClick(gif, e)} // Passe l'événement à handleGifClick
                      />
                    </div>
                  )}
                </div>
                <button className='footer-button' onClick={handleSend}><img src={sendButton} alt="send" /></button>
              </footer>
            </>
          ) : (
            // Nouveau contenu quand aucune conversation n'est sélectionnée
            <div className="empty-conversation">
              <h2>Welcome to chat!</h2>
              <span>start a direct or a group chat with others</span>
              <button>
                <img src={newChatWhite} alt="new-chat" />
                <span>Start new chat</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messagerie;