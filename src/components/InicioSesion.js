import React, { useState } from "react";
import "./iniciosesion.css";

//import 'tailwindcss/tailwind.css';

const InicioSesion = ({ onLogin }) => {
  const [email, setEmail] = useState("");

  // Función para manejar el envío del formulario de inicio de sesión
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar el correo electrónico
    if (!email) {
      alert("Por favor, ingrese su correo electrónico");
      return;
    }

    // Llamar a la función onLogin con el correo electrónico
    onLogin(email);
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
                        <div className="form-group d-flex flex-column align-items-center mt-5 ">
                          <input
                            className="form-control form-control-user"
                            type="email"
                            id="emailInput"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Email"
                            style={{fontFamily:"Arial", border: "solid", borderColor: "#673ab7", borderRadius: 0, borderWidth: "2px" }}
                          />
                        </div>
                        <div className="form-group ">
                          <input
                            className="form-control form-control-user mt-4"
                            type="password"
                            id="emailInput"
                            placeholder="Password"
                            style={{fontFamily:"Arial",border: "solid" , borderColor: "#673ab7", borderRadius: 0, borderWidth: "2px"}}
                            
                          />
                        </div>
                        <div className="text-center d-flex justify-content-start">
                          <button
                            className="btn text-white mt-5 rounded-pill"
                            style={{ width: 170,height: 60, backgroundColor : "#673ab7" }}
                            type="submit"
                          >
                            Login
                          </button>
                          <p className="ms-5" style={{marginTop:63}}>
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

export default InicioSesion;
