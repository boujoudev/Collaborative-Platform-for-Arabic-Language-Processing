import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilSideBarre = () => {
  const [Info, setInfo] = useState("true");
  const [Post, setPost] = useState("false");
  const [Project, setProject] = useState("false");
  const [Activities, setActivities] = useState("false");
  const GoTo = useNavigate();

  return (
    <div className="ProfilSideBarre">
      <button
        className={Info}
        id="1Ops"
        onClick={() => {
          GoTo("/Profil/Information");
          setInfo("true");
          setPost("false");
          setProject("false");
          setActivities("false");
        }}
      >
        Information
      </button>
      <button
        className={Post}
        id="1Ops"
        onClick={() => {
          setInfo("false");
          setPost("true");
          setProject("false");
          setActivities("false");
        }}
      >
        Posts
      </button>
      <button
        className={Project}
        id="1Ops"
        onClick={() => {
          GoTo("/Profil/Project");
          setInfo("false");
          setPost("false");
          setProject("true");
          setActivities("false");
        }}
      >
        Projects
      </button>
      <button
        className={Activities}
        id="1Ops"
        onClick={() => {
          GoTo("/Profil/Activities");
          setInfo("false");
          setPost("false");
          setProject("false");
          setActivities("true");
        }}
      >
        Activities
      </button>
    </div>
  );
};

export default ProfilSideBarre;
