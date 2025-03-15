import "./App.css";
import SIdeBarre1 from "./component/SIdeBarre1";
import BarreDERecherche from "./component/BarreDERecherche";
import SignInSignUp from "./component/SignInSignUp";
import SignUpPage from "./component/SignUpPage";
import SignInPage from "./component/SignInPage";

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
        
      </main>
      <aside className="aside2">Sidebar 2</aside>
    </div>
  );
}

export default App;
