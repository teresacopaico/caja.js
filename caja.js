
// Alumno/a: Teresa Copaico
// uso de IA: use Claude y Gemini para ayudarme a solucionarlo cuando me trabe en ciertos 
// puntos como registrar la venta con el importe ya con el descuento, esto en el cierre 
// me daba la sumatoria de los descuentos, o registrar ordenes que no sean negativas

class Caja {
  #nombre;
  #ventas;
  #cancelaciones;
  #motivo;

  // 1.A) El constructor recibe el nombre del kiosco. La caja arranca con la lista 
  // de ventas vacía y el contador de cancelaciones en cero.
  constructor(nombre) {
    this.#nombre = nombre;
    this.#ventas = [];
    this.#cancelaciones = 0;
    this.#motivo = "";
  }

  // 1.B) cobrar(precio, cantidad) valida que el precio sea un número mayor que cero y 
  // que la cantidad sea un número entero mayor que cero. Si algo está mal, suma una 
  // cancelación y devuelve false. Si está todo bien, calcula el total de la venta, lo guarda
  // en la lista y devuelve true.
  cobrar(precio, cantidad) {
    let salioBien = false;
    if (isNaN(precio) || precio <= 0) {
    //if (isNaN(precio)) {
      this.#motivo = "el precio no es válido.";
      this.#cancelaciones = this.#cancelaciones + 1;
    } else if (isNaN(cantidad) || cantidad <= 0 || cantidad % 1 !== 0) {
      this.#motivo = "la cantidad no es válida.";
      this.#cancelaciones = this.#cancelaciones + 1;
    } else {
      this.#ventas.push(precio * cantidad);
      salioBien = true;
    }
    return salioBien;
  }

  /* 1.C) cobrarConDescuento(precio, cantidad, porcentaje) hace las mismas validaciones y
además controla que el porcentaje esté entre 0 y 100. Si pasa todo, guarda el total 
con el descuento ya aplicado.
*/
  cobrarConDescuento(precio, cantidad, porcentaje) {
    let salioBien = false;
    if (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {
      this.#motivo = "el descuento tiene que estar entre 0 y 100.";
      this.#cancelaciones = this.#cancelaciones + 1;
    } else {
      let impDescuento = (precio * porcentaje) / 100;  // Aca 
      salioBien = this.cobrar(impDescuento, cantidad); 
     // let precioConDescuento = precio * (100 - porcentaje) / 100; 
     // salioBien = this.cobrar(precioConDescuento, cantidad);   // correccion, calculaba el importe descontado y se registraba la venta con el importe del descuento   
    }
    return salioBien;
  }

 /* 1.D) Métodos de acceso: getNombre(), getUltimaVenta(), getCantidadDeVentas(),
getTotalDelDia(), getVentaMayor(), getCancelaciones() y
getMotivoDeCancelacion(). El último devuelve el texto que explica por qué se canceló la
última venta. Ninguno devuelve la lista de ventas
*/
  getNombre() {
    return this.#nombre;
  }
  getUltimaVenta() {
    return this.#ventas[this.#ventas.length - 1];
  }
  getCantidadDeVentas() {
    return this.#ventas.length;
  }
  getTotalDelDia() {
    let total = 0;
    for (let posicion = 0; posicion < this.#ventas.length; posicion = posicion + 1) {
      total = total + this.#ventas[posicion];
    }
    return total;
  }
  getVentaMayor() {
    let mayor = 0; //let mayor = this.#ventas[0]; arranca desde 0 en vez de tomar el primer dato de #ventas
    for (let posicion = 1; posicion < this.#ventas.length; posicion = posicion + 1) {
      if (this.#ventas[posicion] > mayor) {
        mayor = this.#ventas[posicion];
      }
    }
    return mayor;
  }
  getCancelaciones() {
    return this.#cancelaciones;
  }
  getMotivoDeCancelacion() {
    return this.#motivo;
  }

  /* 1.E) mostrarVentas() lista las ventas una por una, el total del día y la venta más
   grande. Si todavía no hay ventas, lo avisa.
*/
  mostrarVentas() {
    if (this.#ventas.length === 0) {
      console.log("Todavía no hay ventas.");
    } else {
      for (let posicion = 0; posicion < this.#ventas.length; posicion = posicion + 1) {
        console.log("Venta " + (posicion + 1) + ": $" + this.#ventas[posicion]);
      }
      console.log("Total del día: $" + this.getTotalDelDia());
      console.log("Venta más grande: $" + this.getVentaMayor());
    }
  }
}

// 2.A) Crea una caja para “Kiosco Don Tito”.
let miCaja = new Caja("Kiosco Don Tito");
let seguir = true;

// 2.B) Muestra el menú con prompt hasta que el usuario elija salir: 1 cobrar, 2 cobrar 
// con descuento, 3 ver ventas, 0 cerrar caja.
while (seguir) {
  let opcion = prompt("1 cobrar, 2 cobrar con descuento, 3 ver ventas, 0 cerrar caja");

  if (opcion === "1" || opcion === "2") {
    let precio = Number(prompt("Precio"));
    let cantidad = Number(prompt("Cantidad"));
    let salioBien = false;
    if (opcion === "1") {
      salioBien = miCaja.cobrar(precio, cantidad);
    } else {
      let porcentaje = Number(prompt("Descuento"));
      salioBien = miCaja.cobrarConDescuento(precio, cantidad, porcentaje);
    }
    if (salioBien) {
      console.log("Venta registrada: $" + miCaja.getUltimaVenta());
    } else {
      console.log("Venta cancelada: " + miCaja.getMotivoDeCancelacion());
    }
  } else if (opcion === "3") {
    miCaja.mostrarVentas();
  } else if (opcion === "0") {
    seguir = false;
  }
}

/* 2.D) Al cerrar la caja muestra el nombre del kiosco, la cantidad de ventas, el total 
del día y las cancelaciones.
*/
console.log("Caja cerrada en " + miCaja.getNombre() + ". Ventas: " + miCaja.getCantidadDeVentas() +
  ". Total: $" + miCaja.getTotalDelDia() + ". Cancelaciones: " + miCaja.getCancelaciones() + ".");

/* 4) Dejá comentadas dos líneas que intenten cambiar el contador de cancelaciones desde afuera
 de la clase. Al lado de cada una, en un comentario, explicá qué pasaría si se ejecutara y 
 por qué eso es un problema.
*/ 

// miCaja.cancelaciones = 0; // No da error, no cambia nada. El problema es que falla en silencio y uno cree que funcionó.


// miCaja.#cancelaciones = 0; // Da error y el programa no arranca. Lo privado no se toca desde afuera.
