import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    // Implémentez ici la logique pour envoyer le lien de réinitialisation
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1 className="platform-title">TAL-Arabe Platform</h1>
        <h2 className="forgot-title">Forgot Password</h2>
        <p className="instruction-text">
          Enter your email address and we will send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="email-input"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="submit-button">
            Send request link
          </button>
        </form>
      </div>
    </div>
  );
}
