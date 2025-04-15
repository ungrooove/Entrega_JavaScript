
let productos = [
    { 
        id: 1, 
        nombre: "Remera", 
        precio: 5000, 
        imagen: "https://cdn-icons-png.flaticon.com/512/8136/8136031.png"  
    },
    { id: 2, 
        nombre: "Pantalón", 
        precio: 8000, 
        imagen: "https://cdn-icons-png.flaticon.com/512/8136/8136031.png" 
    },
    { id: 3, 
        nombre: "Zapatillas", 
        precio: 15000, 
        imagen: "https://cdn-icons-png.flaticon.com/512/8136/8136031.png" 
    },
    { id: 4, 
        nombre: "Medias", 
        precio: 1000, 
        imagen: "https://cdn-icons-png.flaticon.com/512/8136/8136031.png" 
    },
];


function mostrarProductos(el) {

    const contenedor = document.getElementById ("productos-container");

    const card = document.createElement("div");
    card.className = "card-prod";

    const imagen = document.createElement("img");
    imagen.src = el.imagen;
    imagen.className = "img-prod"

    const nombre = document.createElement("p");
    nombre.innerText = el.nombre;
    nombre.className = "title-prod"

    const precio = document.createElement("p");
    precio.innerText = `$${el.precio}`;
    precio.className = "price-prod"

    const boton = document.createElement("button");
    boton.innerText = "Comprar";
    boton.className = "button-prod"

    boton.addEventListener("click", (e) => {
        agregarAlCarrito(el, e.currentTarget);
    });

    card.appendChild(imagen);
    card.appendChild(nombre);
    card.appendChild(precio);
    card.appendChild(boton);

    contenedor.appendChild(card)
};

productos.forEach(el => {
    mostrarProductos(el);
});


// CARRITO
let carrito = [];


function cargarCarrito() {
    const carritoGuardado = localStorage.getItem(`carrito`);
    if(carritoGuardado){
        carrito = JSON.parse(carritoGuardado);
    }
}

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const carritoContainer = document.getElementById("carrito-container");
const botonCarrito = document.querySelector(".button");

botonCarrito.addEventListener("click", () => {
    carritoContainer.style.display = carritoContainer.style.display === "none" ? "flex" : "none";
});


function agregarAlCarrito(producto, boton) {
    let productoEnCarrito = carrito.find((prod) => prod.id === producto.id);

    if(productoEnCarrito){
        productoEnCarrito.cantidad = (productoEnCarrito.cantidad || 1) + 1;

        // Ya estaba en el carrito
        Toastify({
            text: "Unidad agregada",
            className: "info",
            backgroundColor: "#ffcc00",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "left",
        }).showToast();
    } else {
        carrito.push({...producto, cantidad: 1});

        // Primera vez que se agrega
        Toastify({
            text: "Producto agregado al carrito",
            className: "info",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "left",
        }).showToast();
    }

    contadorCarrito();
    mostrarCarrito();
    guardarCarrito();
}




function mostrarCarrito(){
    const productosCarrito = document.getElementById("productos-carrito");
    productosCarrito.innerHTML = ""

    let subtotal = 0;
    const envio = 4000;

    carrito.forEach((producto) =>{
        const item = document.createElement("div");
        item.className = "product";
        
        item.innerHTML = `
        <div>
            <span>${producto.nombre}</span>
        </div>
        <div class="quantity">
            <button class="restar" data-id="${producto.id}">
                <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                </svg>
            </button>
                <label>${producto.cantidad || 1}</label>
            <button class="sumar" data-id="${producto.id}">
                <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                </svg>
            </button>
        </div>
        <label class="price small">$${producto.precio * (producto.cantidad || 1)}</label>
        `;

        productosCarrito.appendChild(item);
        subtotal += producto.precio * (producto.cantidad || 1);
    });

    document.getElementById("subtotal").innerText = `$${subtotal}`;
    document.getElementById("total").innerText = subtotal + envio;

    
    const botonSumar = document.querySelectorAll(".sumar");
    const botonRestar = document.querySelectorAll(".restar");

    botonSumar.forEach((boton) => {
        boton.addEventListener("click", () => modificarCantidad(boton.dataset.id, 1));
    });

    botonRestar.forEach((boton) => {
        boton.addEventListener("click", () => modificarCantidad(boton.dataset.id, -1));
    });
}


function contadorCarrito(){
    const contador = document.querySelector(".quantity-prod p");
    contador.innerText = carrito.length;
}


function modificarCantidad(id, cambio) {
    const producto = carrito.find((prod) => prod.id == id);

    if(producto){
        if(producto.cantidad){
            producto.cantidad += cambio;
        }
        else {
            producto.cantidad = 1 + cambio;
        }
        if(producto.cantidad <= 0){
            carrito = carrito.filter((prod) => prod.id != id);
        }
    }

    contadorCarrito();
    mostrarCarrito();
    guardarCarrito();
}

cargarCarrito();

// VACIAR CARRITO
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    contadorCarrito();

    Toastify({
        text: "Carrito vaciado",
        backgroundColor: "red",
        duration: 3000,
        gravity: "top",
        position: "left",
        close: true
    }).showToast();
});

// COMPRA EXITOSA
const checkoutBtn = document.querySelector(".checkout-btn");
let tooltipMostrado = false;

checkoutBtn.addEventListener("click", () => {
    if (tooltipMostrado) return;
    if (carrito.length === 0) return;
    tippy(checkoutBtn, {
        content: '¡Compra exitosa!',
        trigger: 'manual',
        placement: 'bottom',
        onHidden(instance) {
            instance.destroy();
        }
    }).show();

    tooltipMostrado = true;
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    contadorCarrito();
});
