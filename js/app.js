// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max -10;

// Objeto que va a contener toda la información que le pasemos
const infoAuto = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

marca.addEventListener('change', e => {
    infoAuto.marca = e.target.value;
    filtrarAutos();
});

year.addEventListener('change', e => {
    // Convertir el valor de strig a número para darle una igualdad estricta al filtrar el año
    infoAuto.year = parseInt(e.target.value);
    filtrarAutos();
    filtrarAutos();
});

minimo.addEventListener('change', e => {
    infoAuto.minimo = e.target.value;
    filtrarAutos();
});

maximo.addEventListener('change', e => {
    infoAuto.maximo = e.target.value;
    filtrarAutos();
});

puertas.addEventListener('change', e => {
    infoAuto.puertas = parseInt(e.target.value);
    filtrarAutos();
});

transmision.addEventListener('change', e => {
    infoAuto.transmision = e.target.value;
    filtrarAutos();
});

color.addEventListener('change', e => {
    infoAuto.color = e.target.value;
    filtrarAutos();
});

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    // Muestra los autos en la página
    mostrarAutos(autos);

    // Genera los años
    llenarYear();
})

// Funciones
function mostrarAutos(autos) {
    // Limpia el HTML
    limpiarHTML();

    autos.forEach( auto => {
        const {marca, year, precio, puertas, transmision, color} = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} ${year} - Precio: ${precio} - ${puertas} Puertas - Transmisión: ${transmision} - Color: ${color} 
        `;
        
        resultado.appendChild(autoHTML);
    })
}

// Genera los años
function llenarYear() {
    for(let i = max; i > min; i--) {
        const yearHTML = document.createElement('option');
        yearHTML.value = i;
        yearHTML.textContent = i;

        year.appendChild(yearHTML);
    }
}

// Filtra el contenido seleccionado
function filtrarAutos() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(resultado);

    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

// Muestra un mensaje de error
function noResultado() {

    limpiarHTML();

    const mensajeError = document.createElement('div');
        mensajeError.classList.add('error', 'alerta');
        mensajeError.textContent = 'No se encontraron resultados. Intente con otros términos de búsqueda';

        resultado.appendChild(mensajeError);
}

function filtrarMarca(auto) {
    // Si 'infoAuto.marca' tiene un valor, mandará a ejecutar la función
    if(infoAuto.marca) {
        return infoAuto.marca === auto.marca;
    } else {
        return auto;
    }
}

function filtrarYear(auto) {
    if(infoAuto.year) {
        return infoAuto.year === auto.year;
    } else {
        return auto;
    }
}

function filtrarMinimo(auto) {
    if(infoAuto.minimo) {
        return infoAuto.minimo <= auto.precio;
    } else {
        return auto;
    }
}

function filtrarMaximo(auto) {
    if(infoAuto.maximo) {
        return infoAuto.maximo >= auto.precio;
    } else {
        return auto;
    }
}

function filtrarPuertas(auto) {
    if(infoAuto.puertas) {
        return infoAuto.puertas === auto.puertas;
    } else {
        return auto;
    }
}

function filtrarTransmision(auto) {
    if(infoAuto.transmision) {
        return infoAuto.transmision === auto.transmision;
    } else {
        return auto;
    }
}   

function filtrarColor(auto) {
    if(infoAuto.color) {
        return infoAuto.color === auto.color;
    } else {
        return auto;
    }
}

// Limpia el HTML
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
