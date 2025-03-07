const formulario = document.getElementById("input-container");


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    botonCerrar()

const usuario = document.getElementById("usuario").value
const pass = document.getElementById("pass").value

if (usuario === "coder" && pass === "12345"){
    window.location.href = "/Entrega_JavaScript/productos.html"

    } else {
        document.getElementById("error-box").style.display = "flex";
}

});

function botonCerrar(){
    document.getElementById("error-box").style.display = "none";
}

const cerrarError = document.getElementById("error-box");
cerrarError.onclick = () => botonCerrar()
