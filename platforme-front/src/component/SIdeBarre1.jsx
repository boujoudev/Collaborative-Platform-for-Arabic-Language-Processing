import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SIdeBarre1 = () => {
  const GoTo = useNavigate();

  // Initialisation des états avec les valeurs de localStorage
  const [Home, setHome] = useState(() => {
    const savedHome = localStorage.getItem("Home");
    return savedHome ? JSON.parse(savedHome) : "true";
  });
  const [Disc, setDisc] = useState(() => {
    const savedDisc = localStorage.getItem("Disc");
    return savedDisc ? JSON.parse(savedDisc) : "false";
  });
  const [Event, setEvent] = useState(() => {
    const savedEvent = localStorage.getItem("Event");
    return savedEvent ? JSON.parse(savedEvent) : "false";
  });
  const [Tool, setTool] = useState(() => {
    const savedTool = localStorage.getItem("Tool");
    return savedTool ? JSON.parse(savedTool) : "false";
  });
  const [Project, setProject] = useState(() => {
    const savedProject = localStorage.getItem("Project");
    return savedProject ? JSON.parse(savedProject) : "false";
  });
  const [Bib, setBib] = useState(() => {
    const savedBib = localStorage.getItem("Bib");
    return savedBib ? JSON.parse(savedBib) : "false";
  });
  const [Corpus, setCorpus] = useState(() => {
    const savedCorpus = localStorage.getItem("Corpus");
    return savedCorpus ? JSON.parse(savedCorpus) : "false";
  });
  const [Course, setCourse] = useState(() => {
    const savedCourse = localStorage.getItem("Course");
    return savedCourse ? JSON.parse(savedCourse) : "false";
  });

  // Sauvegarder les états dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("Home", JSON.stringify(Home));
    localStorage.setItem("Disc", JSON.stringify(Disc));
    localStorage.setItem("Event", JSON.stringify(Event));
    localStorage.setItem("Tool", JSON.stringify(Tool));
    localStorage.setItem("Project", JSON.stringify(Project));
    localStorage.setItem("Bib", JSON.stringify(Bib));
    localStorage.setItem("Corpus", JSON.stringify(Corpus));
    localStorage.setItem("Course", JSON.stringify(Course));
  }, [Home, Disc, Event, Tool, Project, Bib, Corpus, Course]);

  return (
    <nav className="menue">
      <button
        className={Home}
        id="1Ops"
        onClick={() => {
          GoTo("/");
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
        <i className="fa-solid fa-house"></i> Home
      </button>
      <button
        className={Disc}
        id="1Ops"
        onClick={() => {
          GoTo("/Forum");
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
        <i className="fa-solid fa-comments"></i> Discussion Forum
      </button>
      <button
        className={Event}
        id="3Ops"
        onClick={() => {
          GoTo("/Event");
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
        <i className="fa-solid fa-calendar-days"></i> Event
      </button>
      <button
        className={Tool}
        id="4Ops"
        onClick={() => {
          GoTo("/Tool");
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
        <i className="fa-solid fa-screwdriver-wrench"></i> Linguistic Tools
      </button>
      <button
        className={Project}
        id="5Ops"
        onClick={() => {
          GoTo("/Project");
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
        <i className="fa-solid fa-diagram-project"></i> Research Projects
      </button>
      <button
        className={Bib}
        id="6Ops"
        onClick={() => {
          GoTo("/BiBlio");
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
        <i className="fa-solid fa-book"></i> Virtual Library
      </button>
      <button
        className={Corpus}
        id="7Ops"
        onClick={() => {
          GoTo("/Corpus");
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
        <i className="fa-solid fa-database"></i> Corpus
      </button>
      <button
        className={Course}
        id="8Ops"
        onClick={() => {
          GoTo("/Course");
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
        <i className="fa-solid fa-graduation-cap"></i> Courses
      </button>
    </nav>
  );
};

export default SIdeBarre1;
