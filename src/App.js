import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import  Iniciar  from './pages/IniciarSesionPage'
import  HomePage from './pages/Homepage'
import Registro from './pages/RegistroPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/iniciar" element={<Iniciar />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

