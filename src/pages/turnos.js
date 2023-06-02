import React, { useEffect, useState } from 'react';
import showMessage from '../utils/showMessage';
import Navbar from '../components/layout/navbar';
import Hero from '../components/hero/Hero';
import { AuthContext } from "../contexts/authContext";
import uuid4 from "uuid4";

import '../components/turnos/style.css'

const TurnosPage = () => {
  const [usuarioActual, setUsuarioActual] = useState({ nombre: '', email: '', telefono: '' });
  const { checkLogin, user, login } = React.useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    checkLogin().then((usuario) => {
      if (usuario) {
        setUsuarioActual(usuario);

        // Obtener los turnos del usuario
        const turnosActuales = JSON.parse(localStorage.getItem(usuario.email)) || [];
        setTurnos(turnosActuales);
        setUsuarioActual(usuario);
      } else {
        window.location.href = '/login';
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener los datos del formulario
    const formData = new FormData(e.target);
    const motivo = formData.get("motivo");
    const fecha = formData.get("fecha");

    // Crear el objeto turno
    const turno = {
      motivo,
      fecha,
      uuid: uuid4(),
    }

    // guardar turno en el local storage
    const turnosActuales = JSON.parse(localStorage.getItem(usuarioActual.email)) || [];
    turnosActuales.push(turno);
    localStorage.setItem(usuarioActual.email, JSON.stringify(turnosActuales));

    // actualizar estado
    const nuevosTurnos = [...turnos, turno];
    setTurnos(nuevosTurnos);

    // limpiar formulario
    e.target.reset();

    // mostrar mensaje de exito
    showMessage('Turno creado exitosamente', 'success', 'Aceptar');
  }

  const handleDelete = (uuid) => {
    console.log(uuid);
    const nuevosTurnos = turnos.filter((turno) => turno.uuid !== uuid);

    // actualizar el local storage
    localStorage.setItem(usuarioActual.email, JSON.stringify(nuevosTurnos));

    // actualizar el estado
    setTurnos(nuevosTurnos);
  }

  return (
    <div>
      <>
        <Navbar />
        <Hero usuarioActual={usuarioActual} />
        <div>
          <div className="container">
            <form onSubmit={handleSubmit} className="form-container">
              <h2 className="title">Agenda tu cita</h2>
              <div className="form-group">
                <label className="field-label" >Motivo de la cita</label>
                <textarea required className="field" type="area" name="motivo" />
              </div>
              <div className="form-group">
                <input required name='fecha' type="date"></input>
              </div>

              <button>Agendar</button>
            </form>
          </div>

          <div>
            <h1>Turnos</h1>
            {
              turnos.map((turno) => (
                <div key={turno.uuid} className="card">
                  <p className="card-title">{turno.fecha}</p>
                  <p className="card-description">{turno.motivo}</p>
                  <button onClick={() => handleDelete(turno.uuid)} className="delete-button">x</button>
                </div>
              ))
            }

          </div>
        </div>
      </>
    </div>
  );
};

export default TurnosPage;