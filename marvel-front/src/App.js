import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import Home from "./pages/home";
import Characters from "./pages/characters";
import CharacterSheet from "./pages/character-sheet";
import Header from "./components/header";
import Comics from "./pages/comics";
import Favourites from "./pages/favourites";
import ComicPage from "./pages/comic-page";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterSheet />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  );
}

export default App;
