import React from "react";
import ProfilASuivre from "../ProfilASuivre";

const RecommondationProfilAsuivre = () => {
  return (
    <div className="RecommondationProfilAsuivre">
      <h5
        style={{
          margin: "5px",
          marginLeft: "0px",
        }}
      >
        Add to your feed
      </h5>
      <div>
        <ProfilASuivre />
        <ProfilASuivre />
      </div>
      <h5
        style={{
          margin: "5px",
          marginLeft: "0px",
          cursor: "pointer",
        }}
      >
        See all suggestions
      </h5>
    </div>
  );
};

export default RecommondationProfilAsuivre;
