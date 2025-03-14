import "./App.css";
import SIdeBarre1 from "./component/SIdeBarre1";

function App() {
  return (
    <div className="grid-container">
      <div className="platformName">LOGO</div>
      <div className="barreDeRecherch">Search Bar</div>
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
