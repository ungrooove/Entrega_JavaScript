
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

    card.appendChild(imagen);
    card.appendChild(nombre);
    card.appendChild(precio);
    card.appendChild(boton);

    contenedor.appendChild(card)
};

productos.forEach(el => {
    mostrarProductos(el);
});


