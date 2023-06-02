import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Turnos from './pages/turnos'
import HomePage from './pages/Homepage'
import Registro from './pages/RegistroPage'

import { AuthProvider } from "./contexts/authContext";
import Login from './components/InicioSesion'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/turnos" element={<Turnos />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

