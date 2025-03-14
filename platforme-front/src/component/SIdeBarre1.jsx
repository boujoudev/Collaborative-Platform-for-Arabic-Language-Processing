import React, { useState } from "react";

const SIdeBarre1 = () => {
  const [Home, setHome] = useState("true");
  const [Disc, setDisc] = useState("false");
  const [Event, setEvent] = useState("false");
  const [Tool, setTool] = useState("false");
  const [Project, setProject] = useState("false");
  const [Bib, setBib] = useState("false");
  const [Corpus, setCorpus] = useState("false");
  const [Course, setCourse] = useState("false");

  return (
    <div className="menue">
      <button
        className={Home}
        id="1Ops"
        onClick={() => {
          setHome("true");
          setDisc("false");
          setEvent("false");
          setTool("false");
          setProject("false");
          setBib("false");
          setCorpus("false");
          setCourse("false");
        }}
      >
        <i class="fa-solid fa-house"></i> Home
      </button>
      <button
        className={Disc}
        id="2Ops"
        onClick={() => {
          setHome("false");
          setDisc("true");
          setEvent("false");
          setTool("false");
          setProject("false");
          setBib("false");
          setCorpus("false");
          setCourse("false");
        }}
      >
        <i class="fa-solid fa-comments"></i> Discussion Forum
      </button>
      <button
        className={Event}
        id="3Ops"
        onClick={() => {
          setHome("false");
          setDisc("false");
          setEvent("true");
          setTool("false");
          setProject("false");
          setBib("false");
          setCorpus("false");
          setCourse("false");
        }}
      >
        <i class="fa-solid fa-calendar-days"></i> Event
      </button>
      <button
        className={Tool}
        id="4Ops"
        onClick={() => {
          setHome("false");
          setDisc("false");
          setEvent("false");
          setTool("true");
          setProject("false");
          setBib("false");
          setCorpus("false");
          setCourse("false");
        }}
      >
        <i class="fa-solid fa-screwdriver-wrench"></i> Linguistic Tools
      </button>
      <button
        className={Project}
        id="5Ops"
        onClick={() => {
          setHome("false");
          setDisc("false");
          setEvent("false");
          setTool("false");
          setProject("true");
          setBib("false");
          setCorpus("false");
          setCourse("false");
        }}
      >
        <i class="fa-solid fa-diagram-project"></i> Research Projects
      </button>
      <button
        className={Bib}
        id="6Ops"
        onClick={() => {
          setHome("false");
          setDisc("false");
          setEvent("false");
          setTool("false");
          setProject("false");
          setBib("true");
          setCorpus("false");
          setCourse("false");
        }}
      >
        <i class="fa-solid fa-book"></i> Virtual Library
      </button>
      <button
        className={Corpus}
        id="7Ops"
        onClick={() => {
          setHome("false");
          setDisc("false");
          setEvent("false");
          setTool("false");
          setProject("false");
          setBib("false");
          setCorpus("true");
          setCourse("false");
        }}
      >
        <i class="fa-solid fa-database"></i> Corpus
      </button>
      <button
        className={Course}
        id="8Ops"
        onClick={() => {
          setHome("false");
          setDisc("false");
          setEvent("false");
          setTool("false");
          setProject("false");
          setBib("false");
          setCorpus("false");
          setCourse("true");
        }}
      >
        <i class="fa-solid fa-graduation-cap"></i> Courses
      </button>
    </div>
  );
};

export default SIdeBarre1;
