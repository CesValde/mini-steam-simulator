/* amigos.js */

/**
 * Remueve la clave del usuario logeado y redirige al login
 */
export function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
}

const botonCerrarSesion = document.getElementById('btn-cerrar-sesion')
botonCerrarSesion.addEventListener('click', () => cerrarSesion())
let user = localStorage.getItem("usuarioLogueado")

/* Recupero la data que se guardo en el local storage del usuario logueado, la data es el json con los datos del usuario */
document.addEventListener('DOMContentLoaded', () => {
    const dataStr = localStorage.getItem(`userData-${user}`)
    if(!dataStr) {
        document.querySelector('.contenedor-amigos').textContent = "No se encontraron datos";
        return;
    }
    const data = JSON.parse(dataStr);
    const infoUser = data.usuarios.find(u => u.usuario === `${user}`);
    if(infoUser) {
        if(infoUser.friendslist && infoUser.friendslist.friends.length > 0) {
            infoUser.friendslist.friends.forEach(friend => {
                const listaAmigos = document.querySelector('.contenedor-amigos')
                listaAmigos.innerHTML += 
                `
                <div class="lista-amigos-user"> 
                    <img src="../img/${friend.img}" alt="${friend.steam_user}" />
                    <h3>${friend.steam_user}</h3>
                </div>
                `
            });
        } else {
            document.getElementById('lista-amigos').textContent = "Aún no tienes amigos :(";
        }
    } else {
        console.log("Usuario no encontrado");
        document.getElementById('lista-amigos').textContent = "Usuario no encontrado.";
    }
});

const redirecciones = [
    { id: 'boton-ir-amigos', destino: 'amigos.html' },
    { id: 'boton-ir-home', destino: 'main.html' }
];

redirecciones.forEach(({ id, destino }) => {
    const boton = document.getElementById(id);
    if (boton) {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = destino;
        });
    }
});

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
resetTimer()