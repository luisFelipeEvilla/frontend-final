// CuentaUsuario.js
import React, { useEffect, useState } from "react";


const CuentaUsuario = ({ usuarioId }) => {
  const [recordatorio, setrecordatorio] = useState(false);
  const [citasUsuario, setCitasUsuario] = useState([]);

  const obtenerCitasUsuario = (usuarioId) => {
    const citasExistente = localStorage.getItem(usuarioId);
    return citasExistente ? JSON.parse(citasExistente) : [];
  };
  //const citasUsuario = obtenerCitasUsuario(usuarioId);

  useEffect(() => {
    const citas = obtenerCitasUsuario(usuarioId);
    setCitasUsuario(citas);
    // Obtener la fecha actual y el día anterior
    const fechaActual = new Date();
    const fechaAnterior = new Date(fechaActual);
    fechaAnterior.setDate(fechaAnterior.getDate() + 1);

    const dia = fechaAnterior.getDate();
    const mes = fechaAnterior.getMonth() + 1; // Los meses en JavaScript son base 0, por lo que se suma 1
    const anio = fechaAnterior.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${anio}`;

    console.log(fechaFormateada);
    // Verificar si alguna cita coincide con el día anterior
    const citaDiaAnterior = citas.find((cita) => {
      const [dia, mes, anio] = cita.split("/"); // Suponiendo que las citas tienen el formato "dd/mm/yyyy"
      const fechaCita = new Date(anio, mes - 1, dia); // Los meses en JavaScript son base 0, por lo que se resta 1

      return (
        fechaCita.getDate() === fechaAnterior.getDate() &&
        fechaCita.getMonth() === fechaAnterior.getMonth() &&
        fechaCita.getFullYear() === fechaAnterior.getFullYear()
      );
    });
    console.log(citaDiaAnterior);
    // Si hay una cita para el día anterior, mostrar el mensaje
    if (citaDiaAnterior) {
      setrecordatorio(true);
    }
  }, [usuarioId]);
  const eliminarCita = (index) => {
    const nuevasCitas = [...citasUsuario];
    nuevasCitas.splice(index, 1);
    setCitasUsuario(nuevasCitas);
    localStorage.setItem(usuarioId, JSON.stringify(nuevasCitas));
  };
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div>
      {recordatorio && (
        <>
          <section class="py-5">
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
                          style={{ width: 110, height: 110, marginLeft: 250 }}
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
      <div style={{ backgroundColor: "#673ab7" }}>
        <div class="container px-5 my-5">
          <div class="row gx-5 justify-content-center">
            <div class="col-lg-11 col-xl-9 col-xxl-8">
              <section>
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <h2 class="fw-bolder mb-0 mt-4" style={{ color: "white" }}>
                    Citas Programadas:
                  </h2>
                </div>
                <ul>
                  {citasUsuario.map((cita, index) => (
                    <div
                      key={index}
                      class="card shadow border-0 rounded-4 mb-5"
                    >
                      <div class="card-body p-2 d-flex justify-content-between m-auto ">
                        <div class="row align-items-center gx-5">
                          <div class="col text-center text-lg-start mb-4 mb-lg-0">
                            <div class="bg-light p-1 rounded-4">
                              <div
                                class="fw-bolder mb-2"
                                style={{ color: "#673ab7" }}
                              >
                                {cita}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-8" style={{width:350}}>
                            <p >Tienes una cita programada para este día.</p>
                          </div>
                          <button 
                            className="btn text-danger "
                            onClick={() => eliminarCita(index)}
                            style={{width: 100, height: 50}}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </section>
              <div class="pb-5"></div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default CuentaUsuario;
