
import React from "react";


export default function AfterForgetPassword() {
  const email = "aymeneMeghni@gmail.com";

  const handleBackToLogin = () => {
    // Implémentez ici la navigation vers la page de connexion
    console.log("Redirection vers la page de connexion");
  };

  return (
    <div className="confirmation-container">
      {/* Carte contenant le message de confirmation */}
      <div className="confirmation-card">
        {/* Titre de la plateforme */}
        <h1 className="confirmation-title">TAL-Arabe Platform</h1>

        {/* Icône d'enveloppe */}
        <div className="confirmation-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e2b7a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        {/* Texte de confirmation */}
        <p className="confirmation-text">
          If an account exists for <strong>{email}</strong>, you will receive a
          password reset link shortly.
        </p>

        {/* Bouton pour revenir à la page de connexion */}
        <button onClick={handleBackToLogin} className="confirmation-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Login
        </button>
      </div>
    </div>
  );
}
