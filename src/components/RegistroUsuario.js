import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import GenericInput from './inputs/genericInput';
import PrimaryButton from './buttons/primaryButton';



const RegistroUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar los datos del formulario
    if (!nombre || !email || !telefono) {
      Swal.fire({
        title: 'Por favor, ingrese todos los datos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      })
        ;
      return;
    }

    // Crear un objeto con los datos del usuario
    const nuevoUsuario = {
      nombre,
      email,
      password,
      telefono,
    };

    // Guardar el usuario en localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

    // Limpiar los campos del formulario
    setNombre('');
    setEmail('');
    setTelefono('');
    setPassword('');

    Swal.fire({
      title: 'Usuario registrado exitosamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    })
      ;
    navigate('/iniciar');
  };

  return (
    <>
      <div className="login-page">
        <div className="row justify-content-center"></div>
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block">
                    <img
                      src="https://img.freepik.com/vector-gratis/ilustracion-concepto-abstracto-pagina-inicio-sesion_335657-3875.jpg?w=740&t=st=1685590573~exp=1685591173~hmac=ade1f548898077ea342e31b0c640acf8423eb1196524217bf448a5781cf27980"
                      alt="Login image"
                      className="w-100 h-100"
                    />
                  </div>
                  <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">

                    <div className="container">
                      <div className="p-5">
                        <div className="text-center d-flex justify-content-start flex-column align-items-start">
                          <h1
                            className="h4 text-gray-900 mb-4"
                            style={{ fontFamily: "Arial" }}
                          >
                            Bienvenido !
                          </h1>
                          <p>
                            Registro de usuario
                          </p>
                        </div>
                        <form className="user" onSubmit={handleSubmit}>
                          <GenericInput value={nombre} setValue={setNombre} placeholder="Nombre" type="text" />
                          <GenericInput value={telefono} setValue={setTelefono} placeholder="Telefono" type="number" />
                          <GenericInput value={email} setValue={setEmail} placeholder="Email" type="email" />
                          <GenericInput value={password} setValue={setPassword} placeholder="Contraseña" type="password" />
                          <div className="text-center d-flex justify-content-start">
                            <PrimaryButton type="submit" text="Registrarse" />
                            <p className="ms-5" style={{ marginTop: 63 }}>
                              Olvidaste la contraseña?
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistroUsuario;
