import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonForConnectUser = () => {
  const GoTo = useNavigate();
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: "rgb(3, 25, 81)",
      }}
    >
      <button
        className="DiscussionList"
        style={{
          color: "white",
          backgroundColor: "rgb(3, 25, 81)",
          border: "none",
          cursor: "pointer",
        }}
      >
        <i class="fa-regular fa-comment-dots"></i>
      </button>
      <button
        style={{
          color: "white",
          backgroundColor: "rgb(3, 25, 81)",
          border: "none",
          cursor: "pointer",
        }}
        className="Notification"
      >
        <i class="fa-regular fa-bell"></i>
      </button>
      <button
        className="ToProfil"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "150px",
          color: "white",
          backgroundColor: "rgb(3, 25, 81)",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => {
          GoTo("/Profil");
        }}
      >
        <img
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
          }}
          src="/placeholder.svg?height=100&width=100"
          alt="Photo de profil"
          className="photo"
        />
        <p
          style={{
            margin: "5px",
            fontSize: "12px",
            fontFamily: "Arial , sans-serif",
            fontWeight: "bold",
          }}
        >
          Aymene Meghni
        </p>
        <i class="fa-solid fa-chevron-down"></i>
      </button>
    </div>
  );
};

export default ButtonForConnectUser;
