/* Simulacion de Steam */
import { actualizarCarrito, crearCardCarrito, cerrarSesion, inicioSesion, juegosDisponibles, compraExitosa, resetTimer} from '../Js/functions.js';

/* Tomamos el usuario logueado */
export let user = localStorage.getItem("usuarioLogueado")
const mostrarBienvenida = localStorage.getItem('mostrarBienvenida')

inicioSesion(user)

/* mostrar la bienvenida sl iniciar sesion */
if(mostrarBienvenida === 'true') {
    Toastify({
        text: `¡Bienvenido ${user}, un gusto tenerte de regreso!`,
        duration: 3000,
        className: "info",
        style: {
            background: "linear-gradient(to right, #361a5fff, #181c5fff)",
        }
    }).showToast()

    // Lo elimino para que no vuelva a mostrarse al refrescar
    localStorage.removeItem('mostrarBienvenida')
}

/* Recuperamos el carrito si el usuario tenia productos cargados */
const carritoGuardado = localStorage.getItem(`carrito_steam_${user}`)
export let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : []

/* Recuperamos los juegos comprados */
const misJuegosGuardados = localStorage.getItem(`mis-juegos-${user}`)
export let misJuegos = misJuegosGuardados ? JSON.parse(misJuegosGuardados) : []

/* Se renderiza el carrito */
crearCardCarrito(carrito, misJuegos)

/* Renderizamos los productos en el main.html */
export let juegosTienda = [];
fetch('../json/juegos.json')
.then(res => res.json())
.then(data => {
    juegosTienda = data.juegos
    juegosDisponibles(juegosTienda, misJuegos)
});

/* ----------------------------------------------------------------------------------------- */
// Manejo de DOM

/* const bienvenida = document.getElementById('bienvenida') */
const botonCerrarSesion = document.getElementById('btn-cerrar-sesion')
const terminarCompra = document.getElementById('terminar-compra')
const totalCarrito = document.getElementById('total-carrito')

botonCerrarSesion.addEventListener('click', () => cerrarSesion())
terminarCompra.addEventListener('click', () => {
    if(carrito.length > 0) {
        compraExitosa(misJuegos)
        carrito.splice(0, carrito.length)
        actualizarCarrito(carrito, misJuegos)
        juegosDisponibles(juegosTienda, misJuegos)
    } else {
        Toastify({
            text: `El carrito esta vacio!`,
            duration: 3000,
            className: "info",
            style: {
                background: "linear-gradient(to right, #361a5fff, #181c5fff)",
            }
        }).showToast()
    }
    totalCarrito.textContent = 'Tu carrito esta vacio'
})

async function dataAmigosUser() {
    try {
        let response = await fetch('../json/usuarios.json');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-ir-amigos');
    if(boton) {
        boton.addEventListener('click', async (e) => {
            e.preventDefault();
            const data = await dataAmigosUser();
            localStorage.setItem(`userData-${user}`, JSON.stringify(data));
            window.location.href = 'amigos.html';
        });
    }
});

const boton = document.getElementById("boton-ir-home");
if(boton) {
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "main.html";
    });
}

resetTimer()

// Eventos que indican actividad
window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;  // clicks
window.ontouchstart = resetTimer; // pantalla táctil
window.onclick = resetTimer;       // clicks
window.onscroll = resetTimer;