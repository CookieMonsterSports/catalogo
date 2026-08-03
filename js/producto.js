/*
=====================================================
Cookie Monster Sports
Archivo: producto.js
Versión: 0.5
=====================================================
*/


let productos = [];


/**
 * Obtiene el producto solicitado
 * desde la URL.
 */
function obtenerSlugProducto() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    return parametros.get("producto");

}


/**
 * Carga los productos.
 */
async function cargarProducto() {


    try {


        const respuesta =
            await fetch("data/productos.json");


        if (!respuesta.ok) {

            throw new Error(
                "No se pudo cargar productos.json"
            );

        }


        productos =
            await respuesta.json();


        mostrarProducto();


    }


    catch(error) {


        console.error(error);


        document.getElementById(
            "detalle-producto"
        ).innerHTML = `

            <p class="mensaje-vacio">
                No fue posible cargar el producto.
            </p>

        `;


    }


}


/**
 * Busca y muestra el producto.
 */
function mostrarProducto() {


    const slug =
        obtenerSlugProducto();


    const producto =
        productos.find(
            item => item.slug === slug
        );


    const contenedor =
        document.getElementById(
            "detalle-producto"
        );


    if (!producto) {


        contenedor.innerHTML = `

            <p class="mensaje-vacio">
                Producto no encontrado.
            </p>

        `;


        return;


    }


    contenedor.innerHTML = `


        <div class="galeria-producto">


            <img

                id="imagen-principal"

                src="${producto.imagenPrincipal}"

                alt="${producto.nombre}"

                onerror="this.src='img/placeholder.webp'"

            >


            <div class="miniaturas">


                ${producto.galeria.map(imagen => `


                    <img

                        src="${imagen}"

                        alt="${producto.nombre}"

                        onclick="cambiarImagen('${imagen}')"

                        onerror="this.src='img/placeholder.webp'"

                    >


                `).join("")}


            </div>


        </div>



        <div class="informacion-detalle">


            <h1>
                ${producto.nombre}
            </h1>


            <p>
                ⚽ ${producto.equipo}
            </p>


            <p>
                👕 ${producto.marca}
                |
                ${producto.version}
            </p>


            <p>
                📅 Temporada:
                ${producto.temporada}
            </p>


            <p>
                👤 ${producto.genero}
            </p>


            <p>
                📏 Tallas:
                ${producto.tallas.join(", ")}
            </p>


        </div>


    `;


}


/**
 * Cambia la imagen principal.
 */
function cambiarImagen(imagen) {


    document.getElementById(
        "imagen-principal"
    ).src = imagen;


}



document.addEventListener(
    "DOMContentLoaded",
    cargarProducto
);
