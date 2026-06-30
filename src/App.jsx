import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import './App.css'

import Personagens from "./pages/Personagens";
import Episodios from "./pages/Episodios";
import Localizacoes from "./pages/Localizacoes";
import Favoritos from "./pages/Favoritos";

function App() {
  
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Personagens />} />
        <Route path="/episodes" element={<Episodios />} />
        <Route path="/locations" element={<Localizacoes />} />
        <Route path="/favorites" element={<Favoritos />} />
      </Routes>
    </>

  )
}

export default App
