/*
NOTA: Usualmente las clases se reservan para los objetos de las aplicaciones
Se utilizaran dos Clases, una que controle el presupuesto y otra que controla la interfaz de usuario

como pasar el presupuesto hacia la clase UI e insertar presupuesto y restante.

agregar ek nuevo gasto hacia la clase de presupuesto restar la canitdad y istar los gastos en la parte superior.
*/

// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');



// Eventos
const eventListeners = () => { 
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        // console.log(gasto);
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
    }
}

class UI {
    // No requiere constructor, porque seran metodos que impriman HTML basados en la clase Presupuesto  
    insertarPresupuesto(cantidad){
        // console.log(cantidad);
        // Extrayendo los valores
        const { presupuesto, restante } = cantidad;

        // Agregando al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        // Crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');            
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario) // insertBefore toma dos argumentos el primero es que vamos a insertar, el segundo en que lugar será insertado

        // Quitar del HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
    }

} 

// Instanciar
const ui = new UI();
let presupuesto;


// Funciones
const preguntarPresupuesto = () => {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
    console.log(Number(presupuestoUsuario));

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();   // Vuelve a cargar la URL actual, como el botón Actualizar.
    }

    // Presupuesto válido
    presupuesto = new Presupuesto(presupuestoUsuario)
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto)

}

// Añadir gastos
const agregarGasto = (e) => {
    e.preventDefault(); 

    // Leer datos del formulario
    const nombre = document.querySelector('#gasto').value
    const cantidad = Number(document.querySelector('#cantidad').value);
    // console.log(nombre);
    // console.log(cantidad);

    // Validar
    if (nombre === '' || cantidad === '') {
        // console.log('Ambos campos son obligatorios');
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if ( cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return; 
    }

    // console.log('Agregando gasto');

    // Generar un objeto con el gasto
    const gasto = { nombre , cantidad, id: Date.now() } // Date.now() es lo más parecido a un ID sin una base de datos

    // Añade nuevo gasto
    presupuesto.nuevoGasto(gasto)

    // Mensaje todo correcto
    ui.imprimirAlerta('Gasto agregado Correctamente',)

    // Reiniciar formulario
    formulario.reset();

    

}

eventListeners();