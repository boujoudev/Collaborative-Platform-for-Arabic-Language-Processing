import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
const ButtonForConnectUser = () => {
  const GoTo = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Gérer le clic à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      // vérifie si le clic est à l’intérieur du menu.
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    // écoute tous les clics sur la page.
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // permet de nettoyer l'écouteur quand le composant est démonté (bon pour les performances).
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={menuRef}
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: "#1A237E",
      }}
    >
      <button
        className="DiscussionList"
        style={{
          color: "white",
          backgroundColor: "#1A237E",
          border: "none",
          cursor: "pointer",
        }}
      >
        <i class="fa-regular fa-comment-dots"></i>
      </button>
      <button
        style={{
          color: "white",
          backgroundColor: "#1A237E",
          border: "none",
          cursor: "pointer",
        }}
        className="Notification"
      >
        <i class="fa-regular fa-bell"></i>
      </button>
      <button
        className="ToProfil"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "150px",
          color: "white",
          backgroundColor: "#1A237E",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img
          onClick={() => {
            GoTo("/Profil");
          }}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
          }}
          src="image.jpg"
          alt="Photo de profil"
          className="photo"
        />
        <p
          onClick={() => {
            GoTo("/Profil");
          }}
          style={{
            margin: "5px",
            fontSize: "12px",
            fontFamily: "Arial , sans-serif",
            fontWeight: "bold",
          }}
        >
          Aymene Meghni
        </p>
        {isOpen ? (
          <i
            class="fa-solid fa-chevron-up"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          ></i>
        ) : (
          <i
            class="fa-solid fa-chevron-down"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          ></i>
        )}

        {isOpen && (
          <div className="profile-menu">
            <button
              style={{
                color: " rgb(3, 25, 81)",
                marginBottom: "5px",
                padding: "0px",
                border: "none",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                GoTo("/Profil");
              }}
            >
              <i class="fa-solid fa-user"></i> Mon profile
            </button>

            <button
              style={{
                color: " rgb(3, 25, 81)",
                marginBottom: "5px",
                padding: "0px",
                border: "none",
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              <i class="fa-solid fa-gear"></i> Paramètres
            </button>

            <button
              style={{
                color: " rgb(220, 15, 15)",
                marginBottom: "5px",
                padding: "0px",
                border: "none",
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              <i class="fa-solid fa-right-from-bracket"></i> Déconnexion
            </button>
          </div>
        )}
      </button>
    </div>
  );
};

export default ButtonForConnectUser;
