import React from 'react';
import '../header/header.css';
 import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <input type="text" placeholder="Buscar" />
        <button>Buscar</button>
      </div>
      <div className="header-right">
        <Link className="link" to="/iniciar"> Iniciar sesion </Link>
        <Link className="link" to="/registro"> Registrarse </Link>
      </div>
    </header>
  );
}

export default Header;
