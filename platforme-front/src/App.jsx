import "./App.css";
import SIdeBarre1 from "./component/SIdeBarre1";
import BarreDERecherche from "./component/BarreDERecherche";
import SignInSignUp from "./component/SignInUp/SignInSignUp";
import SignUpPage from "./component/SignInUp/SignUpPage";
import SignInPage from "./component/SignInUp/SignInPage";
import HomeFirstElement from "./component/Home/HomeFirstElement";
import ForumEntet from "./component/forum/ForumEntet";
import PostInForum from "./component/forum/PostInForum";
import ToolEntet from "./component/tool/ToolEntet";
import Tool from "./component/tool/Tool";
import ProjectEntet from "./component/Project/ProjectEntet";
import Project from "./component/Project/Project";
import EventEntet from "./component/Event/EventEntet";
import Event from "./component/Event/Event";
import ForumPage from "./component/forum/ForumPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/Home/HomePage";
import ToolPage from "./component/tool/ToolPage";
import EventPage from "./component/Event/EventPage";
import ProjectPage from "./component/Project/ProjectPage";
import SideBarre2Text from "./component/SideBarre2Text";
import ProfilASuivre from "./component/ProfilASuivre";
import ConfARejoindre from "./component/ConfARejoindre";
import RecommondationProfilAsuivre from "./component/Recommandation/RecommondationProfilAsuivre.jsx";
import RecomandationConfARejoindre from "./component/Recommandation/RecomandationConfARejoindre";
import ToolAUtiliser from "./component/ToolAUtiliser.jsx";
import RecomandationTools from "./component/Recommandation/RecomandationTools.jsx";
import ProfilSideBarre from "./component/Profil/ProfilSideBarre.jsx";
import ProfilEntet from "./component/Profil/ProfilEntet.jsx";
import ButtonForConnectUser from "./component/ButtonForConnectUser.jsx";
import ProfilInformation from "./component/Profil/ProfilInformation.jsx";
import InformationPage from "./component/Profil/InformationPage.jsx";
import ProfilProject from "./component/Profil/ProfilProject.jsx";
import ProfilActivité from "./component/Profil/ProfilActivité.jsx";
import React, { useState } from "react";
import ForumEntetIn from "./component/forum/ForumEntetIn";
import CodeVerification from "./component/SignInUp/CodeVerification";

import CommentForm from "./component/Comment/CommentForm";

function App() {
  const [Connect, setConnect] = useState(true);
  return (
    <div className="grid-container">
      <div className="platformName">TAL-Arabic Platforme</div>
      <div className="barreDeRecherch">
        <BarreDERecherche />
      </div>
      <div className="otherButton">
        {Connect ? <ButtonForConnectUser /> : <SignInSignUp />}
      </div>
      <aside className="aside1">
        <SIdeBarre1 />
      </aside>
      <main>
        {/* <CommentForm/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Forum" element={<ForumPage />} />
          <Route path="/Event" element={<EventPage />} />
          <Route path="/Tool" element={<ToolPage />} />
          <Route path="/Project" element={<ProjectPage />} />
          <Route path="/BiBlio" element={<h1>Event</h1>} />
          <Route path="/Corpus" element={<h1>Event</h1>} />
          <Route path="/Course" element={<h1>Event</h1>} />
          <Route path="/Profil" element={<InformationPage />} />
          <Route path="/Profil/Information" element={<InformationPage />} />
          <Route path="/Profil/Project" element={<ProfilProject />} />
          <Route path="/Profil/Activities" element={<ProfilActivité />} />
          <Route path="/Forum/id" element={<ForumEntetIn />} />
        </Routes>
      </main>
      <aside className="aside2">
        <Routes>
          <Route path="/" element={<RecommondationProfilAsuivre />} />
          <Route path="/Forum" element={<RecommondationProfilAsuivre />} />
          <Route path="/Event" element={<RecomandationConfARejoindre />} />
          <Route path="/Tool" element={<RecomandationTools />} />
          <Route path="/Profil" element={<ProfilSideBarre />} />
          <Route path="/Profil/Information" element={<ProfilSideBarre />} />
          <Route path="/Profil/Project" element={<ProfilSideBarre />} />
          <Route path="/Profil/Activities" element={<ProfilSideBarre />} />
        </Routes>
        <SideBarre2Text />
      </aside>
    </div>
  );
}

export default App;
