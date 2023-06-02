export default function Hero({ usuarioActual }) {
    return (
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
    )
}