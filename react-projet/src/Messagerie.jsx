import React from 'react'
import newChat from './assets/chat-new-svgrepo-com.svg'
import infoButton from './assets/info-circle-svgrepo-com.svg'
import closeButton from './assets/close-lg-svgrepo-com.svg'
import sendButton from './assets/send-alt-1-svgrepo-com.svg'
import emojiButton from './assets/emoji-smile-svgrepo-com.svg'
import gifButton from './assets/gif-svgrepo-com.svg'
import cameraButton from './assets/camera-svgrepo-com.svg'
import settingsButton from './assets/settings-svgrepo-com.svg'
import picConv from "./assets/IMG_20241127_173103_809.jpg"
import './Messagerie.css'

function Messagerie() {
  const messages = [
    {
      id: "msg-1",
      content: "Salut, comment tu vas ?",
      created_at: "2025-05-01T09:15:28.724Z",
      is_read: true,
      sender_id: "7",
      receiver_id: "1",
      sender: {
        id: 7,
        full_name: "Ali Merabet",
        username: "AliM",
      },
      receiver: {
        id: 1,
        full_name: "Karim Boudiaf",
        username: "KarimB",
      },
    },
    {
      id: "msg-2",
      content: "Très bien merci ! Et toi ?",
      created_at: "2025-05-01T09:17:11.000Z",
      is_read: true,
      sender_id: "1",
      receiver_id: "7",
      sender: {
        id: 1,
        full_name: "Karim Boudiaf",
        username: "KarimB",
      },
      receiver: {
        id: 7,
        full_name: "Ali Merabet",
        username: "AliM",
      },
    },
    {
      id: "msg-3",
      content: "Dispo pour une réunion à 14h ?",
      created_at: "2025-05-01T09:20:00.000Z",
      is_read: false,
      sender_id: "7",
      receiver_id: "1",
      sender: {
        id: 7,
        full_name: "Ali Merabet",
        username: "AliM",
      },
      receiver: {
        id: 1,
        full_name: "Karim Boudiaf",
        username: "KarimB",
      },
    },
  ];

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
              <div className='conv'>
                  <img src={picConv} />
                  <div className='conv-c'>
                        <div className='conv-span'>
                          <span>Rayan</span>
                          <span>22:00</span>
                        </div>
                        <p>Salut, ceci est un test de message</p>
                  </div>
              </div>
            </div>

            <div className='right-side'>
              <header className='header-right-side'>
                <span className='name-conv'>Nom</span>
                <button className='header-button'>
                  <img src={settingsButton} alt="settings button" />
                </button>
              </header>
              
              <main className='main-right-side'>
                <div className='message'>
                  <img src={picConv} alt="" />
                  <div>
                    <div className='message-span'>
                      <span>Rayan</span>
                      <span>22:00</span>
                    </div>
                    <p>Salut, ceci est un test de message</p>
                  </div>
                </div>
              </main>


              <footer className='footer-right-side'>
                <button className='footer-button'>
                  <img src={cameraButton} alt="" />
                </button>
                <div className='square-msg'>
                <textarea placeholder='Message' id="">
                </textarea>
                <div className='footer-button-container'>
                  <button className='footer-button'>
                    <img src={gifButton} alt="" />
                  </button>
                  <button className='footer-button'>
                    <img src={emojiButton} alt="" />
                  </button>
                </div>
                </div>
                <button className='footer-button'>
                    <img src={sendButton} alt="" />
                </button>
              </footer>

            </div>
      </div>
      
  </div>
  )
}

export default Messagerie
