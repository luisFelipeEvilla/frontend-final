// CalendarioMensual.js
import React, { useState } from "react";
import "react-responsive-datepicker/dist/index.css";
import { DatePicker } from "react-responsive-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';


const CalendarioMensual = ({ usuarioId, onSeleccionarFecha }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const handleSeleccionarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    onSeleccionarFecha(fecha);
    // Guardar la fecha de la cita en localStorage con el ID del usuario
    guardarCita(usuarioId, fecha.toISOString()); // Ejemplo de almacenamiento de la fecha de la cita
  };

  const guardarCita = (usuarioId, fechaCita) => {
    const citasExistente = localStorage.getItem(usuarioId);
    const citas = citasExistente ? JSON.parse(citasExistente) : [];

    const fecha = new Date(fechaCita);
    const dia = fecha.getDate() ;
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript son base 0, por lo que se suma 1
    const anio = fecha.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${anio}`;
    citas.push(fechaFormateada);

    localStorage.setItem(usuarioId, JSON.stringify(citas));
  };
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <div>
        <div class="container px-5">
          <div class="rounded-4 px-4 px-md-5">
            <div class=" mb-4">
              <h1 class="fw-bolder">Calendario Mensual</h1>
              <p class="lead fw-normal text-muted mb-0">Agenda tu cita!</p>
              <div>
                <button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="btn btn-white border-1 rounded-4 shadow-sm px-4 py-2 fw-bold mt-3"
                  style={{ backgroundColor: "white", borderColor:"#673ab7", color:"#673ab7" }}
                >
                  
                  Abrir calendario
                  <FontAwesomeIcon icon={faCalendarDays} size="xs" className="ms-2" />
                </button>
                <DatePicker
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  defaultValue={new Date}
                  minDate={new Date}
                  headerFormat="DD, MM dd"
                  onChange={(date) => {
                    console.log(date);
                    handleSeleccionarFecha(date);
                  }}

                />
              </div>
            {/*   <input
                type="date"
                onChange={(event) =>
                  handleSeleccionarFecha(new Date(event.target.value))
                }
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarioMensual;
