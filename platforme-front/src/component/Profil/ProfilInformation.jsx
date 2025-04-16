import React from "react";
import Competance from "./Competance";
import Experience from "./Experience";
import Formation from "./Formation";

const ProfilInformation = () => {
  const skills = ["aymene", "fdtgfvd", "azazaead", "azasz"];
  const F = [{ Title: "aahhhah", Disc: "ejruhjfkdjj", Date: "ddddd" }];
  return (
    <div className="container">
      {/* Première rangée */}
      <div className="row">
        {/* Carte À propos */}
        <div className="card">
          <h2>about </h2>
          <p
            style={{
              margin: "0px",
              paddingLeft: "5px",
              fontSize: "12px",
              "font-family": "Arial , sans-serif",
              color: "gray",
            }}
          >
            Chercheur spécialisé dans le traitement automatique de la langue
            arabe avec plus de 5 ans d'expérience. Mes domaines d'intérêt
            incluent l'analyse morphologique, la reconnaissance des dialectes
            maghrébins et le développement d'outils linguistiques pour l'arabe.
          </p>
        </div>

        {/* Carte Contact */}
        <div className="card">
          <h2>Contact Information</h2>
          <p
            style={{
              margin: "0px",
              paddingLeft: "5px",
              fontSize: "12px",
              "font-family": "Arial , sans-serif",
              color: "gray",
            }}
          >
            meghnimohamedaymene@example.com
          </p>
          <p
            style={{
              margin: "0px",
              paddingLeft: "5px",
              fontSize: "12px",
              "font-family": "Arial , sans-serif",
              color: "gray",
            }}
          >
            +213 555 123 456
          </p>
          <p
            style={{
              margin: "0px",
              paddingLeft: "5px",
              fontSize: "12px",
              "font-family": "Arial , sans-serif",
              color: "gray",
            }}
          >
            Alger, Algérie
          </p>
          <p
            style={{
              margin: "0px",
              paddingLeft: "5px",
              fontSize: "12px",
              "font-family": "Arial , sans-serif",
              color: "gray",
            }}
          >
            www.example.com
          </p>
        </div>
      </div>

      {/* Deuxième rangée */}
      <div className="row">
        {/* Carte Expérience */}
        <div className="card">
          <h2>about </h2>
          <Experience
            Title={"TAL ARABic"}
            Disc={
              "AZ DEAD EFRGETG ETGERFERERF  refrf erfec erferfg erferrferfrf"
            }
            Date={"2020 - 2024"}
          />
        </div>

        {/* Carte Compétences */}
        <div className="card">
          <h2>Skills</h2>
          <div className="skills">
            {skills.map((e, index) => {
              return <Competance key={index} NameC={e} />;
            })}
          </div>
        </div>
      </div>
      {/* 3eme row */}
      <div className="row">
        {/* Carte formation */}
        <div className="cardLast">
          <h2>about </h2>
          <Formation
            Title={"TAL ARABic"}
            Disc={
              "AZ DEAD EFRGETG ETGERFERERF  refrf erfec erferfg erferrferfrf"
            }
            Date={"2020 - 2024"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilInformation;
