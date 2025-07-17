/* Imports */
import { carrito } from '../src/miSteam.js'
import { user }  from '../src/miSteam.js'

/**
 * Verifica que el usuario tenga el juego comprado. Agrega el juego llegado por parametro en caso de no estar en el carrito y actualiza el carrito de compra.
 */
export function agregarJuegosCarrito(juego, misJuegos) {
    const existe = misJuegos.find(elem => elem.titulo === juego.titulo);
    if(!existe) {
        const juegoEnCarrito = carrito.find(item => item.titulo === juego.titulo);
        if(!juegoEnCarrito) {
            // Si no existe, agregamos el juego
            carrito.push(juego);
        }
    }
    actualizarCarrito(carrito, misJuegos)
}

/**
 * Actualiza el carrito de compras llegado por parametro, lo guardamos en el localStorage y creamos las cards para el carrito
 */
export function actualizarCarrito(carrito, misJuegos) {
    localStorage.setItem(`carrito_steam_${user}`, JSON.stringify(carrito))
    crearCardCarrito(carrito, misJuegos)
}

/**
 * Crea las respectivas cards de los juegos que estan incluidos en el carrito de compras y calcula el total de la compra
 */
export function crearCardCarrito(carrito, misJuegos) {
    const listaJuegos = document.getElementById('carrito-juegos')
    const totalCarrito = document.getElementById('total-carrito')
    let total = 0
    listaJuegos.innerHTML = "";

    carrito.forEach(juego => {
        total += juego.precio ;
        const existe = misJuegos.find(elem => elem.titulo === juego.titulo);
        
        if(!existe) {
            listaJuegos.innerHTML += `
            <div class="card-carrito"> 
                <img src="../img/${juego.imagen}" alt="${juego.titulo}" />
                <h3>${juego.titulo}</h3>
                <p>Precio: $${juego.precio}</p>
            </div>
            `;
        } 
    });
    
    if(carrito.length > 0) {
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    } else {
        totalCarrito.textContent = 'Tu carrito esta vacio'
    }
}

/**
 * Remueve la clave del usuario logeado y redirige al login
 */
export function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
}

/**
 * Al terminar al compra se muestra la notificacion y cambia el boton de la card
 */
export function compraExitosa(misJuegos) {
    Toastify({
        text: "Compra Realizada con Exito!",
        duration: 3000
    }).showToast()

    carrito.forEach(juegoComprado => {
        misJuegos.push(juegoComprado)
        const boton = document.querySelector(`.btn-comprar-juego[data-index="${juegoComprado.index}"]`);
        if(boton) {
            boton.innerText = "Ya en tu biblioteca";
        }
    });
    localStorage.setItem(`mis-juegos-${user}`, JSON.stringify(misJuegos))
}

/**
 * Verifica si el user es valido para iniciar sesion importante!!-> utiliza logica de login.js
 */
export function inicioSesion(user) {
    if(!user) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
        window.location.href = "login.html";
    }
}

/**
 *  Despliega los juegos del JSON en un div propio con sus propiedades
 */
export function juegosDisponibles(juegos, misJuegos) {
    const listaJuegos = document.querySelector('.contenedor-juegos');
    listaJuegos.innerHTML = "";

    juegos.forEach((juego, index) => { 
        let texto = ''
        let existe = false
        // verifico si ya existe el juego en la 'biblioteca'(localStorage) del usuario
        if(misJuegos.length > 0) {
            existe = misJuegos.find(elem => elem.titulo === juego.titulo)
        }
        texto = existe ? 'Ya tienes este juego' : 'Comprar'

        // verifico si hay juegos en el carrito para recordar el texto al hacer f5
        const juegosEnCarrito = carrito.find(elem => elem.titulo === juego.titulo);
        if(juegosEnCarrito) {
            texto = "Eliminar del carrito";
        }

        listaJuegos.innerHTML += `
            <div class="juego-card"> 
                <img src="../img/${juego.imagen}" alt="${juego.titulo}" />
                <h3>${juego.titulo}</h3>
                <p>Precio: $${juego.precio}</p>
                <button class="btn-comprar-juego" data-index="${index}">${texto}</button>
            </div>
        `;
    });

    // Guardamos referencia para que el evento pueda usarla
    const juegosRef = juegos;
    document.querySelectorAll(".btn-comprar-juego").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const juego = juegosRef[index];
            const card = e.target.closest(".juego-card");
            const button = card.querySelector(".btn-comprar-juego");

            /* Si el juego se elimina del carrito */
            if(button.textContent == "Eliminar del carrito") {
                const juegoEnCarritoIndex = carrito.findIndex(item => item.titulo === juego.titulo);
                if(juegoEnCarritoIndex !== -1) {
                    carrito.splice(juegoEnCarritoIndex, 1);
                    actualizarCarrito(carrito, misJuegos);
                    button.textContent = "Comprar";
                }
            } else if(button.textContent == "Comprar") {     /* Si el juego se agrega al carrito */
                button.textContent = "Eliminar del carrito"
                agregarJuegosCarrito({ ...juego, index }, misJuegos);
            } else {
                /* Si el juego ya esta comprado */
                Toastify({
                    text: "No se puede comprar, ya tienes este juego en tu biblioteca!",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #361a5fff, #181c5fff)",
                    }
                }).showToast();
            }
        });
    });
}

let timeoutID;
export function resetTimer() {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
        localStorage.removeItem('user');
        Swal.fire({
            icon: 'info',
            title: 'Sesión expirada',
            text: 'Por inactividad, se cerró la sesión. Por favor, inicia sesión nuevamente.',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = 'login.html';
        });
    }, 5000); // 30 minutos
}