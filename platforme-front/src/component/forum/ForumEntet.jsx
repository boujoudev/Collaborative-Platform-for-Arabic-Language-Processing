import React from "react";

const ForumEntet = () => {
  return (
    <div className="ForumEntet">
      <h3
        style={{
          "font-family": "Arial , sans-serif",
          color: "black",
          margin: "0px",
          padding: "5px",
          paddingTop:"10px"
        }}
      >
        Discussion Forum
      </h3>
      <button className="AddForum">+ New Discussion</button>
    </div>
  );
};

export default ForumEntet;
