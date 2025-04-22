import React from "react";

const ProjectEntet = () => {
  return (
    <div>
      <div className="ProjectEntet">
        <h3
          style={{
            "font-family": "Arial , sans-serif",
            color: "black",
            margin: "0px",
            padding: "10px",
            paddingTop: "10px",
          }}
        >
          Research Projects
        </h3>

        <button
          style={{
            "font-family": "Arial , sans-serif",
            color: "white",
            marginLeft: "10px",
          }}
          className="AddProject"
        >
          + New Project
        </button>
      </div>
    </div>
  );
};

export default ProjectEntet;
