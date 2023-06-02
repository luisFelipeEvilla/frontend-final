import React, { useEffect, useState } from "react";
import "./iniciosesion.css";
import GenericInput from "./inputs/genericInput";
import PrimaryButton from "./buttons/primaryButton";
import { AuthContext } from "../contexts/authContext";
import showMessage from "../utils/showMessage";

//import 'tailwindcss/tailwind.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { checkLogin, user, login } = React.useContext(AuthContext);

  useEffect(() => {
  }, []);

  // Función para manejar el envío del formulario de inicio de sesión
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) showMessage("error", "Todos los campos son obligatorios", "Aceptar");

    // Verificar si el usuario existe en localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuariosGuardados.find((usuario) => usuario.email === email);

    // Verificar si el usuario existe
    if (!usuarioEncontrado) return showMessage('Usuario no encontrado', 'error', 'Aceptar');

    // Verificar si la contraseña es correcta
    if (usuarioEncontrado.password !== password) return showMessage('Contraseña incorrecta', 'error', 'Aceptar');

    showMessage('Inicio de sesión correcto', 'success', 'Aceptar');
    login(usuarioEncontrado);
    window.location.href = "/turnos";
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
                      src="https://img.freepik.com/vector-gratis/ilustracion-concepto-abstracto-votacion-electronica_335657-3763.jpg?w=740&t=st=1685590645~exp=1685591245~hmac=3b4d5771cc3324ef2212e0a62afe87191ea38531c1ef56f7186f3172ebdf2cc8"
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
                            Bienvenido nuevamente!
                          </h1>
                          <p>
                            Inicia sesion para continuar
                          </p>
                        </div>
                        <form className="user" onSubmit={handleSubmit}>
                          <GenericInput type={'email'} value={email} setValue={setEmail} placeholder={'Email'} />
                          <GenericInput type={'password'} value={password} setValue={setPassword} placeholder={'Contraseña'} />
                          <div className="text-center d-flex justify-content-start">
                            <PrimaryButton type={'submit'} text={'Iniciar sesión'} />
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

export default Login;
