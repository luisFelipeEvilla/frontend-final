export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light py-3" style={{ backgroundColor: "#673ab7" }}>
            <div class="container px-5">
                <a class="navbar-brand" href="index.html"><span class="fw-bolder" style={{ color: "white" }}>Mi Perfil</span></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                        <li class="nav-item"><a class="nav-link" href="/" style={{ color: "white" }}>Salir</a></li>
                        <li class="nav-item"><img class="img-fluid" src="https://static.vecteezy.com/system/resources/previews/009/350/845/original/arrow-cursor-pointer-logout-exit-png.png" alt="..." style={{ width: 30, height: 25, marginTop: 8 }} /></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}