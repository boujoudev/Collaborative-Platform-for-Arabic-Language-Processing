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

function App() {
  return (
    <div className="grid-container">
      <div className="platformName">LOGO</div>
      <div className="barreDeRecherch">
        <BarreDERecherche />
      </div>
      <div className="otherButton">
        <SignInSignUp />
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
        </Routes>
      </main>
      <aside className="aside2">
        <ProfilASuivre />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/HomeSideBarre2" element={<></>} />
          <Route path="/ForumSideBarre2" element={<ForumPage />} />
          <Route path="/EventSideBarre2" element={<EventPage />} />
          <Route path="/ToolSideBarre2" element={<ToolPage />} />
          {/* <Route path="/Project" element={<ProjectPage/>}/>
            <Route path="/BiBlio" element={<h1>Event</h1>}/>
            <Route path="/Corpus" element={<h1>Event</h1>}/>
            <Route path="/Course" element={<h1>Event</h1>}/> */}
        </Routes>
        <SideBarre2Text />
      </aside>
    </div>
  );
}

export default App;
