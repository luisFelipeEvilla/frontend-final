import React, { useEffect, useState } from 'react';
import RegistroUsuario from '../components/RegistroUsuario';
import Login from '../components/InicioSesion';
import CalendarioMensual from '../components/CalendarioMensual';
import CuentaUsuario from '../components/CuentaUsuario';
import showMessage from '../utils/showMessage';
import Navbar from '../components/layout/navbar';
import Hero from '../components/hero/Hero';
import { AuthContext } from "../contexts/authContext";

const TurnosPage = () => {
  const [usuarioActual, setUsuarioActual] = useState({ nombre: '', email: '', telefono: ''});
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const { checkLogin, user, login } = React.useContext(AuthContext);

  useEffect(() => {
    checkLogin().then((usuario) => {
      if (usuario) {
        setUsuarioActual(usuario);
      } else {
        window.location.href = '/login';
      }
    });
  }, []);

  // Función para manejar la selección de fecha en el calendario
  const handleSeleccionarFecha = (fecha) => {
    setTurnoSeleccionado(fecha);
  };

  // Función para crear un nuevo turno
  const crearTurno = () => {
    // Verificar si el usuario está autenticado
    if (!usuarioActual) {
      alert('Debe iniciar sesión para crear un turno');
      return;
    }

    // Verificar si se ha seleccionado una fecha
    if (!turnoSeleccionado) {
      showMessage('Debe seleccionar una fecha', 'error', 'Aceptar');
      return;
    }

    showMessage('Turno creado exitosamente', 'success', 'Aceptar').then(() => {
      // Recargar la página actual
      setReloadKey(prevKey => prevKey + 1);
    });;
  };

  return (
    <div>
      <>
        <Navbar />
        <Hero usuarioActual={usuarioActual} />
        <div>
          <p>Teléfono: {usuarioActual.telefono}</p>
          <CalendarioMensual onSeleccionarFecha={handleSeleccionarFecha} usuarioId={usuarioActual.email} />
          <div class="container px-5">
            <div class="rounded-4 px-md-5">
              <button
                onClick={crearTurno}
                className="btn text-white rounded-pill"
                style={{ width: 170, height: 60, backgroundColor: "#673ab7" }}
                type="submit"
              >Programar Turno</button>
            </div>
          </div>

          {usuarioActual && (
            <div key={reloadKey}> {/* Utilizar la clave de recarga */}
              <CuentaUsuario usuarioId={usuarioActual.email} />
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default TurnosPage;