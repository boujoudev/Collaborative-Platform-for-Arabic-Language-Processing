import "./App.css";
import SIdeBarre1 from "./component/SIdeBarre1";
import BarreDERecherche from "./component/BarreDERecherche";

function App() {
  return (
    <div className="grid-container">
      <div className="platformName">LOGO</div>
      <div className="barreDeRecherch">
        <BarreDERecherche/>
      </div>
      <div className="otherButton">Other Buttons</div>
      <aside className="aside1">
        <SIdeBarre1/>
      </aside>
      <main>Main Content</main>
      <aside className="aside2">Sidebar 2</aside>
    </div>
  );
}

export default App;
