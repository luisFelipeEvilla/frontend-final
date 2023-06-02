import React, { useState } from 'react';
import Header from '../components/header/Header.tsx'
import '../pages/styles.css';

const App = () => {

  return (
    <>
    <div>
     <Header />
     <div className='fondo_home'>
     <header class="py-5">
                <div class="container px-5 pb-5">
                    <div class="row gx-5 align-items-center">
                        <div class="col-xxl-5">
                           
                            <div class="text-center text-xxl-start">
                                <div class="fs-3 fw-light text-muted">Podemos ayudar a organizar tus citas</div>
                                <h1 class="display-3 fw-bolder mb-5"><span class="text-gradient d-inline">Comienza hoy mismo </span></h1>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                    <a class="btn btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href="/iniciar"style={{ width: 170,height: 60, backgroundColor : "#673ab7", color:"white" }}>Iniciar</a>
                                    <a class="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" href="/registro">Registrarse</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-7">
                           
                            <div class="d-flex justify-content-center mt-5 mt-xxl-0">
                                <div class="profile bg-gradient-primary-to-secondary">
                                    
                                    <img class="profile-img" src="https://images.vexels.com/media/users/3/210607/isolated/preview/f33054d9dd182052e77406615f2389fc-mujer-sentada-personaje.png" alt="..." />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            </div>
    </div>
    </>
  );
};

export default App;