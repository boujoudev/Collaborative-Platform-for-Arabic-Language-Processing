import React, { useState } from "react";

const ProfilSideBarre = () => {
  const [Info, setInfo] = useState("true");
  const [Post, setPost] = useState("false");
  const [Project, setProject] = useState("false");
  const [Activities, setActivities] = useState("false");
  return (
    <div className="ProfilSideBarre">
      <button
        className={Info}
        id="1Ops"
        onClick={() => {
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
