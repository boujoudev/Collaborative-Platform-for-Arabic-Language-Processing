import React from "react";
import ConfARejoindre from "../ConfARejoindre";

const RecomandationConfARejoindre = () => {
  return (
    <div className="RecomandationConfARejoindre">
      <h5
        style={{
          margin: "5px",
          marginLeft: "0px",
        }}
      >
        Online Conferences
      </h5>
      <div>
        <ConfARejoindre />
        <ConfARejoindre />
      </div>
      <h5
        style={{
          margin: "5px",
          marginLeft: "0px",
          cursor: "pointer",
        }}
      >
        See all Online Conferences <i class="fa-solid fa-caret-down"></i>
      </h5>
    </div>
  );
};

export default RecomandationConfARejoindre;
