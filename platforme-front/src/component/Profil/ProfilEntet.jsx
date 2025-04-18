import React from "react";

function ProfilEntet() {
  return (
    <div className="profil-container">
      {/* Bannière */}
      <div className="banniere">
        <button className="btn-modifier">Modifier le profil</button>
      </div>

      {/* Contenu du profil */}
      <div className="contenu">
        {/* Photo de profil */}
        <div className="photo-container">
          <img src="image.jpg" className="photo" />
        </div>

        {/* Informations */}
        <div className="info">
          <h1>Aymene Meghni</h1>
          <p>Researcher in Arabic Natural Language Processing</p>
          <p>University of Science and Technology 'Houari Boumediene'</p>

          <a href="#" className="coordonnees">
            Contact information
          </a>

          <div className="stats">
            <span>91 Followers</span>
            <span className="separateur">|</span>
            <span>202 Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilEntet;
