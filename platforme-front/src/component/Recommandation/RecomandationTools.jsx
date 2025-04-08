import React from "react";
import ToolAUtiliser from "../ToolAUtiliser";

const RecomandationTools = () => {
  return (
    <div className="RecomandationTools">
      <h5
        style={{
          margin: "5px",
          marginLeft: "0px",
        }}
      >
        The recommended tools
      </h5>
      <div>
        <ToolAUtiliser />
        <ToolAUtiliser />
      </div>
      <h5
        style={{
          margin: "5px",
          marginLeft: "0px",
          cursor: "pointer",
        }}
      >
       See more <i class="fa-solid fa-caret-down"></i>
      </h5>
    </div>
  );
};

export default RecomandationTools;
