import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilSideBarre = () => {
  const [Info, setInfo] = useState(() => {
    // Lire la valeur du localStorage au premier rendu
    const savedInfo = localStorage.getItem("myInfo");
    return savedInfo ? JSON.parse(savedInfo) : "true";
  });
  const [Post, setPost] = useState(() => {
    // Lire la valeur du localStorage au premier rendu
    const savedPost = localStorage.getItem("myPost");
    return savedPost ? JSON.parse(savedPost) : "false";
  });
  const [Project, setProject] = useState(() => {
    // Lire la valeur du localStorage au premier rendu
    const savedProject = localStorage.getItem("myProject");
    return savedProject ? JSON.parse(savedProject) : "false";
  });
  const [Activities, setActivities] = useState(() => {
    // Lire la valeur du localStorage au premier rendu
    const savedActivities = localStorage.getItem("myActivities");
    return savedActivities ? JSON.parse(savedActivities) : "false";
  });

  useEffect(() => {
    // Sauvegarder la valeur dans le localStorage à chaque changement
    localStorage.setItem("myInfo", JSON.stringify(Info));
    localStorage.setItem("myPost", JSON.stringify(Post));
    localStorage.setItem("myProject", JSON.stringify(Project));
    localStorage.setItem("myActivities", JSON.stringify(Activities));
  }, [Info , Post , Project , Activities]);

  // useEffect(() => {
  //   // Sauvegarder la valeur dans le localStorage à chaque changement
  //   localStorage.setItem("myPost", JSON.stringify(Post));
  // }, [Post]);

  // useEffect(() => {
  //   // Sauvegarder la valeur dans le localStorage à chaque changement
  //   localStorage.setItem("myProject", JSON.stringify(Project));
  // }, [Project]);

  // useEffect(() => {
  //   // Sauvegarder la valeur dans le localStorage à chaque changement
  //   localStorage.setItem("myActivities", JSON.stringify(Activities));
  // }, [Activities]);

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
