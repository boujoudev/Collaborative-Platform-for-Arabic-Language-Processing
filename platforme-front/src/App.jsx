import "./App.css";
import SIdeBarre1 from "./component/SIdeBarre1";
import BarreDERecherche from "./component/BarreDERecherche";
import SignInSignUp from "./component/SignInSignUp";
import SignUpPage from "./component/SignUpPage";
import SignInPage from "./component/SignInPage";
import HomeFirstElement from "./component/Home/HomeFirstElement";
import ForumEntet from "./component/forum/ForumEntet";
import Forum from "./component/forum/Forum";
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

function App() {
  return (
    <div className="grid-container">
      <div className="platformName">LOGO</div>
      <div className="barreDeRecherch">
        <BarreDERecherche />
      </div>
      <div className="otherButton">
        <ButtonForConnectUser/>
      </div>
      <aside className="aside1">
        <SIdeBarre1 />
      </aside>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Forum" element={<ForumPage />} />
          <Route path="/Event" element={<EventPage />} />
          <Route path="/Tool" element={<ToolPage />} />
          <Route path="/Project" element={<ProjectPage />} />
          <Route path="/BiBlio" element={<h1>Event</h1>} />
          <Route path="/Corpus" element={<h1>Event</h1>} />
          <Route path="/Course" element={<h1>Event</h1>} />
          <Route path="/Profil" element={<ProfilEntet />} />
        </Routes>
      </main>
      <aside className="aside2">
        <Routes>
          <Route path="/" element={<RecommondationProfilAsuivre />} />
          <Route path="/Forum" element={<RecommondationProfilAsuivre />} />
          <Route path="/Event" element={<RecomandationConfARejoindre />} />
          <Route path="/Tool" element={<RecomandationTools />} />
          <Route path="/Profil" element={<ProfilSideBarre />} />
        </Routes>
        <SideBarre2Text />
      </aside>
    </div>
  );
}

export default App;
