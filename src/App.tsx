import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokemonCRUD from "./pages/PokemonCRUD";
import PokedexLimit from "./pages/PokedexLimit";
import PokedexToPdf from "./pages/PokedexToPdf";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonCRUD />} />
        <Route path="/pokedex" element={<PokedexLimit />} />
        <Route path="/pokemon/pdf" element={<PokedexToPdf />} />
      </Routes>
    </Router>
  );
}

export default App;
