import React, { useState } from 'react';
import RegistroUsuario from '../components/RegistroUsuario';
import InicioSesion from '../components/InicioSesion';
import CalendarioMensual from '../components/CalendarioMensual';
import CuentaUsuario from '../components/CuentaUsuario';
import Swal from 'sweetalert2';



const IniciarSesionPage = () => {
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);
  
    // Función para manejar el inicio de sesión exitoso
    const handleLogin = (email) => {
      // Verificar si el usuario existe en localStorage
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuarioEncontrado = usuariosGuardados.find((usuario) => usuario.email === email);
  
      if (usuarioEncontrado) {
        setUsuarioActual(usuarioEncontrado);
      } else {
        Swal.fire({
          title: 'Usuario no encontrado',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          });
      }
    };
  
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
        Swal.fire({
          title: 'Seleccione una fecha',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          });
          
        return;
      }
  
      // Aquí puedes enviar los detalles del turno al servidor
      // y realizar las acciones necesarias
  
     Swal.fire({
        title: 'Turno creado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        // Recargar la página actual
        setReloadKey(prevKey => prevKey + 1);
      });
    };
  
    return (
      <div>
        {usuarioActual ? (
          <>
          <nav class="navbar navbar-expand-lg navbar-light py-3"style={{ backgroundColor: "#673ab7"}}>
                <div class="container px-5">
                    <a class="navbar-brand" href="index.html"><span class="fw-bolder"style={{ color:"white" }}>Mi Perfil</span></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                            <li class="nav-item"><a class="nav-link" href="/"style={{ color:"white" }}>Salir</a></li>
                            <li class="nav-item"><img class="img-fluid" src="https://static.vecteezy.com/system/resources/previews/009/350/845/original/arrow-cursor-pointer-logout-exit-png.png" alt="..." style={{ width: 30,height: 25, marginTop:8 }}/></li>
                        </ul>
                    </div>
                </div>
            </nav>
          <div>
          <div class="container px-5 my-5">
                <div class="text-center mb-5">
                    <h1 class="display-5 fw-bolder mb-0"><span class="text-gradient d-inline">Bienvenid@, {usuarioActual.nombre}!</span></h1>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-11 col-xl-9 col-xxl-8">
        
                        <div class="pb-5"></div>
                      
                    </div>
                </div>
            </div>
            {/* <p>Teléfono: {usuarioActual.telefono}</p> */}
            <CalendarioMensual onSeleccionarFecha={handleSeleccionarFecha} usuarioId={usuarioActual.email} />
            <div class="container px-5">   
              <div class="rounded-4 px-md-5">
                  <button
                    onClick={crearTurno}
                    className="btn text-white rounded-pill"
                    style={{ width: 170,height: 60, backgroundColor : "#673ab7" }}
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
        ) : (
          <div>
            <InicioSesion onLogin={handleLogin} />
          </div>
        )}
      </div>
    );
  };
  
  export default IniciarSesionPage;