/*
=====================================================
Cookie Monster Sports
Archivo: render.js
Versión: 0.3
=====================================================
*/

/**
 * Convierte un texto tipo "club-america"
 * en "Club America".
 */
function formatearTexto(texto) {

    if (!texto) return "";

    return texto
        .split("-")
        .map(palabra =>
            palabra.charAt(0).toUpperCase() +
            palabra.slice(1)
        )
        .join(" ");

}


/**
 * Crea el HTML de una tarjeta.
 */
function crearTarjeta(producto) {

    return `
        <article class="tarjeta">

            <img
                src="${producto.imagenPrincipal}"
                alt="${producto.nombre}"
                loading="lazy"
                onerror="this.src='img/placeholder.webp'"
            >

            <div class="tarjeta-contenido">

                <h2>${producto.nombre}</h2>

                <p>
                    <strong>Equipo:</strong>
                    ${formatearTexto(producto.equipo)}
                </p>

                <p>
                    <strong>Categoría:</strong>
                    ${formatearTexto(producto.categoria)}
                </p>

                <p>
                    <strong>Versión:</strong>
                    ${formatearTexto(producto.version)}
                </p>

                <p>
                    <strong>Temporada:</strong>
                    ${producto.temporada}
                </p>

            </div>

        </article>
    `;

}


/**
 * Dibuja todas las tarjetas.
 */
function renderizarProductos(listaProductos) {

    const catalogo =
        document.getElementById("catalogo");

    if (!catalogo) return;

    if (listaProductos.length === 0) {

        catalogo.innerHTML = `
            <p class="mensaje-vacio">
                No se encontraron productos.
            </p>
        `;

        return;

    }

    catalogo.innerHTML =
        listaProductos
            .map(crearTarjeta)
            .join("");

}
