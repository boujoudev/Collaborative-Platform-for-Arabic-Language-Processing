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
        {/* <SignUpPage/> */}
        <HomeFirstElement/>
        <ForumEntet/>
        <Forum/>
        <Forum/>
        <Forum/>
        <Forum/>
        <ToolEntet/>
        <Tool/>
        <Forum/>
        <ProjectEntet/>
        <Project/>


      </main>
      <aside className="aside2">Sidebar 2</aside>
    </div>
  );
}

export default App;
