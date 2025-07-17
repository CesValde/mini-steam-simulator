# 🎮 Mini Steam Clone - App Educativa

Este proyecto es una simulación de una plataforma similar a **Steam**, desarrollado con fines educativos. Incluye funcionalidades básicas como:

- 🛒 Agregar juegos al carrito
- 💳 Simulación de compra (Sin checkout)
- 👥 Despliegue de amigos del usuario
- 🎮 Catálogo de juegos dinámico

## 🚀 Tecnologías utilizadas

- HTML5 / CSS
- JavaScript (Vanilla JS)
- JSON (para la simulación de datos)
- LocalStorage
- Toastify
- Sweet Alert2

## 📂 Estructura principal

```bash
/steam/
│
├── css/         # Hojas de estilo
│ ├── amigos.css
│ ├── index.css
│ ├── login.css
│ ├── miSteam.css
├── img/         # Imágenes del catálogo, iconos de user
├── js/          # Archivos JavaScript para funcionalidades
│ ├── function.js
├── json/        # Datos simulados (usuarios, juegos)
│ ├── juegos.json
│ ├── usuarios.json
├── src/         # Archivos principales
│ ├── amigos.html
│ ├── amigos.js
│ ├── login.html
│ ├── login.js
│ ├── main.html
│ ├── miSteam.js
└── README.md    # Descripción del proyecto
```

## 🧪 Funcionalidades destacadas

- **Catálogo de juegos**: listado con juegos (desde un JSON local)
- **Carrito de compras**: podés agregar y eliminar juegos
- **Compra simulada**: muestra un mensaje de confirmacion
- **Sistema de amigos**: muestra amigos simulados con su `steamid`
- **Datos recordados**: se guardan el carrito de juegos en localstorage y el usuario que haya hecho login

## 🎯 Objetivo del proyecto

Este proyecto fue realizado como práctica educativa para aplicar conocimientos de programación web, manipulación del DOM, consumo de datos locales y simulación de interfaces reales.

## 🧑‍💻 Autor

- **Nombre**: Cesar Valderrama
- **Academia** - Coder House