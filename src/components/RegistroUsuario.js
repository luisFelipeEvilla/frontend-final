import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericInput from './inputs/genericInput';
import PrimaryButton from './buttons/primaryButton';
import { AuthContext } from "../contexts/authContext";
import showMessage from '../utils/showMessage';

const RegistroUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  const { login } = React.useContext(AuthContext);

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar los datos del formulario
    if (!nombre || !email || !telefono || !password)  showMessage('error', 'Todos los campos son obligatorios', 'Aceptar');

    // Crear un objeto con los datos del usuario
    const nuevoUsuario = {
      nombre,
      email,
      password,
      telefono,
    };

    // cargar lista de usuarios
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // comprobar que el usuario no exista
    const usuarioExistente = usuariosGuardados.find((usuario) => usuario.email === email);
    if (usuarioExistente) return showMessage('El usuario ya existe', 'error', 'Aceptar');

    // Guardar el usuario en el local storage
    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

    // guardar sesion del usuario en el contexto (cookies)
    login(nuevoUsuario);

    // Mostrar mensaje de éxito
    showMessage('Usuario registrado correctamente', 'success', 'Aceptar');
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
