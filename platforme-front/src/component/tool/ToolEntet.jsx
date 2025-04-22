import React from "react";

function ToolEntet() {
  return (
    <div className="ToolEntet">
      <h3
        style={{
          "font-family": "Arial , sans-serif",
          color: "black",
          margin: "0px",
          padding: "10px",
          paddingTop: "10px",
        }}
      >
        Linguistic Tools
      </h3>
      <h5
        style={{
          "font-family": "Arial , sans-serif",
          color: "black",
          margin: "0px",
          padding: "10px",
          paddingTop: "10px",
        }}
      >
        This section includes tools for the automatic processing of the Arabic
        language, including text analysis and speech processing.
      </h5>
      <button
        style={{
          "font-family": "Arial , sans-serif",
          color: "white",
          marginLeft: "10px",
        }}
        className="AddTool"
      >
        + New Tool
      </button>
    </div>
  );
}

export default ToolEntet;
