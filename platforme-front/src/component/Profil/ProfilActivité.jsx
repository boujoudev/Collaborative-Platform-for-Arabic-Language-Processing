import React from "react";
import Activité from "./Activité";
import ProfilEntet from "./ProfilEntet";

const ProfilActivité = () => {
  return (
    <div>
      <ProfilEntet />
      <div className="containerAct">
        <h2 className="titleAct">Activité récente</h2>
        <p className="subtitleAct">
          Vos contributions et interactions sur la plateforme
        </p>

        <div className="activityListAct">
          <Activité
            Title={"Vous avez publié un nouveau sujet dans le forum"}
            Title1={"Avancées en traitement des dialectes maghrébins"}
            Disc={
              " Notre équipe a réalisé une percée significative dans le traitement automatique des dialectes maghrébins..."
            }
            Time={"Il y a 4 heures"}
          ></Activité>
           <Activité
            Title={"Vous avez publié un nouveau sujet dans le forum"}
            Title1={"Avancées en traitement des dialectes maghrébins"}
            Disc={
              " Notre équipe a réalisé une percée significative dans le traitement automatique des dialectes maghrébins..."
            }
            Time={"Il y a 4 heures"}
          ></Activité>
           <Activité
            Title={"Vous avez publié un nouveau sujet dans le forum"}
            Title1={"Avancées en traitement des dialectes maghrébins"}
            Disc={
              " Notre équipe a réalisé une percée significative dans le traitement automatique des dialectes maghrébins..."
            }
            Time={"Il y a 4 heures"}
          ></Activité>
        </div>
      </div>
    </div>
  );
};

export default ProfilActivité;
