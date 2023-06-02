import React, { useEffect, useState } from "react";
import showMessage from "../utils/showMessage";
import Navbar from "../components/layout/navbar";
import Hero from "../components/hero/Hero";
import { AuthContext } from "../contexts/authContext";
import uuid4 from "uuid4";

import "../components/turnos/style.css";

const TurnosPage = () => {
  const [usuarioActual, setUsuarioActual] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });
  const { checkLogin, user, login } = React.useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [recordatorio, setrecordatorio] = useState(false);

  useEffect(() => {
    checkLogin().then((usuario) => {
      if (usuario) {
        setUsuarioActual(usuario);

        // Obtener los turnos del usuario
        const turnosActuales =
          JSON.parse(localStorage.getItem(usuario.email)) || [];
        setTurnos(turnosActuales);
        setUsuarioActual(usuario);
      } else {
        window.location.href = "/login";
      }
    });
    const loadRecordatorio = () => {
      const turnosActuales = JSON.parse(localStorage.getItem(usuarioActual.email)) || [];
      console.log(turnosActuales);
      if (turnosActuales.length === 0) return;
    
      let tieneRecordatorio = false;
    
      turnosActuales.forEach((turno) => {
        const fecha = new Date(turno.fecha);
        const today = new Date();
        console.log(fecha.getDate() +1,fecha.getMonth()+1,fecha.getFullYear());
        console.log(today.getDate()+1,today.getMonth()+1,today.getFullYear());
    
        if (
          fecha.getDate() +1=== today.getDate()+1 &&
          fecha.getMonth()+1 === today.getMonth()+1 &&
          fecha.getFullYear() === today.getFullYear()
        ) {
          tieneRecordatorio = true;
        }
      });
    
      setrecordatorio(tieneRecordatorio);
    };
    
    loadRecordatorio();
    
  }, [usuarioActual.email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener los datos del formulario
    const formData = new FormData(e.target);
    const motivo = formData.get("motivo");
    const fecha = formData.get("fecha");
    const doctor = formData.get("doctor");

    // Crear el objeto turno
    const turno = {
      motivo,
      fecha,
      doctor,
      uuid: uuid4(),
    };
   

    // guardar turno en el local storage

    const turnosActuales =
      JSON.parse(localStorage.getItem(usuarioActual.email)) || [];
    turnosActuales.push(turno);
    localStorage.setItem(usuarioActual.email, JSON.stringify(turnosActuales));

    // actualizar estado
    const nuevosTurnos = [...turnos, turno];
    setTurnos(nuevosTurnos);

    // limpiar formulario
    e.target.reset();

    // mostrar mensaje de exito
    showMessage("Turno creado exitosamente", "success", "Aceptar");
  };

  const handleDelete = (uuid) => {
    console.log(uuid);
    const nuevosTurnos = turnos.filter((turno) => turno.uuid !== uuid);

    // actualizar el local storage
    localStorage.setItem(usuarioActual.email, JSON.stringify(nuevosTurnos));

    // actualizar el estado
    setTurnos(nuevosTurnos);

    // mostrar mensaje de exito
    showMessage("Turno eliminado exitosamente", "success", "Aceptar");
  };

 
  
  
  
  

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
                <label className="field-label">Motivo de la cita</label>
                <textarea
                  required
                  className="field"
                  type="area"
                  name="motivo"
                />
              </div>
              <div className="form-group">
                <input required name="fecha" type="date"></input>
              </div>
              <div className="form-group">
                <label className="field-label">Doctores</label>
                <select className="field-select" name="doctor" required>
                  <option value="Dr. Oscar  Sotomayor ">
                    Dr. Oscar Sotomayor
                  </option>
                  <option value="Dr. Miguel Cañón ">Dr. Miguel Cañón </option>
                  <option value="Dr. Adrián Gutiérrez z">
                    Dr. Adrián Gutiérrez{" "}
                  </option>
                  <option value="No es cita medica">No es cita medica </option>
                </select>
              </div>
              <button className="agendarBtn">Agendar</button>
            </form>
          </div>
          {recordatorio && (
            <>
              <section class="py-5 d-flex flex-column justify-content-center align-items-center">
                <div class="container px-5 mb-5 mx-0">
                  <div class="row gx-5 justify-content-center">
                    <div class="col-lg-11 col-xl-9 col-xxl-8">
                      <div class="card overflow-hidden shadow rounded-4 border-0 ">
                        <div class="card-body p-0">
                          <div class="d-flex align-items-center">
                            <div class="p-4">
                              <h3 class="fw-bolder">
                                Tienes una cita Programada para mañana
                              </h3>
                              <p>Preparate para tu cita</p>
                            </div>
                            <img
                              class="img-fluid"
                              src="https://cdn-icons-png.flaticon.com/512/10002/10002106.png"
                              alt="..."
                              style={{
                                width: 110,
                                height: 110,
                                marginLeft: 250,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
          <div className="turno-container">
            <h1>Turnos</h1>

            <div className="turnos">
              {turnos.map((turno) => (
                <div key={turno.uuid} className="turno">
                  <div className="turno-content">
                    <p className="turno-title">{turno.fecha}</p>
                    <p className="turno-description">{turno.motivo}</p>
                    <p className="turno-description">{turno.doctor}</p>
                  </div>

                  <button
                    className="delete-turno-btn"
                    onClick={() => handleDelete(turno.uuid)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default TurnosPage;
