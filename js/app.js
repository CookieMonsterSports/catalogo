/*
=====================================================
Cookie Monster Sports
Archivo: app.js
Versión: 0.3
=====================================================
*/

let productos = [];


/**
 * Carga los productos desde el archivo JSON.
 */
async function cargarProductos() {

    try {

        const respuesta =
            await fetch("data/productos.json");

        if (!respuesta.ok) {
            throw new Error("No fue posible cargar los productos.");
        }

        productos = await respuesta.json();

        renderizarProductos(productos);

    }
    catch (error) {

        console.error(error);

        const catalogo =
            document.getElementById("catalogo");

        catalogo.innerHTML = `
            <p class="mensaje-vacio">
                Ocurrió un error al cargar el catálogo.
            </p>
        `;

    }

}


/**
 * Filtra los productos.
 */
function filtrarProductos(texto) {

    const termino =
        texto.toLowerCase().trim();

    const resultado = productos.filter(producto =>

        producto.nombre.toLowerCase().includes(termino) ||
        producto.equipo.toLowerCase().includes(termino) ||
        producto.categoria.toLowerCase().includes(termino) ||
        producto.version.toLowerCase().includes(termino)

    );

    renderizarProductos(resultado);

}


/**
 * Inicia la aplicación.
 */
document.addEventListener("DOMContentLoaded", () => {

    cargarProductos();

    const buscador =
        document.getElementById("busqueda");

    buscador.addEventListener("input", (evento) => {

        filtrarProductos(evento.target.value);

    });

});
