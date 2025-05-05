import React from "react";
import send from "./assets/send-svgrepo-com.svg";
import minusButton from "./assets/minus-svgrepo-com.svg";
import botpic from "./assets/chatbot.png";
import onlineIcon from "./assets/online-icon.png"
import "./chatbot.css";

function Chatbot() {
  return (
    <div className="chatbot-container">
      <header>
        <div className="left-part">
            <img  src={botpic} alt="" />
            <div className="square-name">
                <span>Bingo</span>
                <div className="square-online">
                    <img src={onlineIcon} alt="" />
                    <span>Online</span>
                </div>
            </div>
        </div>
        <button><img src={minusButton} alt="close" /></button>
      </header>
      <main>
        <div className="chatbot-message">
            <img src={botpic} alt="" />
            <p>Salut, Ici Bingo pret a vous servir</p>
        </div>
        <div className="user-message">
            <p>Donne moi 10 chercheurs algériens dans le NLP</p>
            <img src={botpic} alt="" />
        </div>


      </main>
      <footer>
        <textarea name="" id="" placeholder="Type your message here..."></textarea>
        <button className="boutton-send"><img src={send} alt="" /></button>

      </footer>
    </div>
  );
}

export default Chatbot;