import React from "react";

const Formation = (props) => {
  return (
    <div className="experience">
      <div className="icon">
        <i class="fa-solid fa-graduation-cap"></i>
      </div>
      <div>
        <h3
          style={{
            margin: "0px",
            paddingLeft: "5px",
            fontSize: "12px",
            "font-family": "Arial , sans-serif",
            fontWeight: "bold",
          }}
        >
          {props.Title}
        </h3>
        <p
          style={{
            color: "gray",
            margin: "0px",
            paddingLeft: "5px",
            fontSize: "10px",
            "font-family": "Arial , sans-serif",
          }}
        >
          {props.Disc}
        </p>
        <p
          className="date"
          style={{
            color: "gray",
            margin: "0px",
            paddingLeft: "5px",
            fontSize: "10px",
            "font-family": "Arial , sans-serif",
          }}
        >
          {props.Date}
        </p>
      </div>
    </div>
  );
};

export default Formation;
