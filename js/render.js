/*
=====================================================
Cookie Monster Sports
Archivo: render.js
Versión: 0.4
=====================================================
*/


/**
 * Convierte valores internos del JSON
 * en texto legible.
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
 * Genera la etiqueta de producto destacado.
 */
function mostrarDestacado(producto) {

    if (!producto.destacado) {
        return "";
    }

    return `
        <span class="etiqueta-destacado">
            ⭐ Destacado
        </span>
    `;

}


/**
 * Crea una tarjeta individual.
 */
function crearTarjeta(producto) {

    return `

        <article class="tarjeta">

            ${mostrarDestacado(producto)}

            <img
                src="${producto.imagenPrincipal}"
                alt="${producto.nombre}"
                loading="lazy"
                onerror="this.src='img/placeholder.webp'"
            >


            <div class="tarjeta-contenido">


                <h2>
                    ${producto.nombre}
                </h2>


                <div class="informacion-producto">


                    <p>
                        ⚽ 
                        ${formatearTexto(producto.equipo)}
                    </p>


                    <p>
                        👕 
                        ${formatearTexto(producto.marca)}
                        |
                        ${formatearTexto(producto.version)}
                    </p>


                    <p>
                        📅 
                        Temporada ${producto.temporada}
                    </p>


                    <p>
                        👤 
                        ${formatearTexto(producto.genero)}
                    </p>


                    <p>
                        📏 
                        Tallas:
                        ${producto.tallas.join(", ")}
                    </p>


                </div>


            </div>

        </article>

    `;

}


/**
 * Renderiza la lista completa.
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
