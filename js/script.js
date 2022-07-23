// Clases
class Cerveza {
  constructor(estilo, nombre, precio, litros, cantidad) {
    this.estilo = estilo;
    this.nombre = nombre;
    this.precio = precio < 0 ? 0 : precio;
    // this.precio = parseFloat(precio);
    this.litros = litros < 0 ? 0 : litros;
    this.cantidad = cantidad < 0 ? 0 : cantidad;
    this.vendido = false;
  };
  totalIva() {
    return this.precio * this.cantidad * 1.21;
  };
  
  vender() {
    this.vendido = true;
  };

  mostrar() {
    return "Nombre: " + this.nombre + " x " + this.cantidad + " Total = $" + this.totalIva() + "\n";
  };
};

class Cliente {
  constructor(nombre, direccion, localidad, codigoPostal) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.localidad = localidad;
    this.codigoPostal = codigoPostal;
  }
}

class Carrito {
  constructor() {
    this.cervezas = [];
  }

  sumar(cerveza) {
    //buscar si la cerveza se encuentra dentro de la lista.
    //Si no la encuentra, agregar.
    //Si la encuentra cantidad++
    let cervezaBuscada = this.cervezas.find((el) => el.nombre === cerveza.nombre);

    if (cervezaBuscada == undefined) {
      this.cervezas.push(cerveza);
    } else {
      cervezaBuscada.cantidad++;
    }
  }

  quitar(cerveza) {
    //buscar si la cerveza se encuentra dentro de la lista.
    //si la encuentra, borrar
    //si no la encuentra, no hacer nada
    let listafiltrada = this.cervezas.filter((el) => el.nombre != cerveza.nombre);
    this.cervezas = listafiltrada;
  };

  vaciar () {
    this.cervezas = [];
  }

  decrementar(cerveza) {
    //buscar si la cerveza se encuentra dentro de la lista.
    //si la encuentro, restar cantidad
    //si no la encuentro, no hace nada.
    let cervezaBuscada = this.cervezas.find((el) => el.nombre === cerveza.nombre);

    if (cervezaBuscada != undefined) {
        cervezaBuscada.cantidad--;
    };
  };

  listar() {
    let texto = '';
    this.cervezas.forEach((e) => texto += e.mostrar());
    texto += "Total: $" + this.total();
    alert (texto);
  };

  total () {
    //Sumar totalIva de cada cerveza y return
    let total = 0;
    this.cervezas.forEach(e => total += e.totalIva());
    return total;
  };
};

// Funciones
function logIn() {
  let savedPass = "birra";
  let ingresar = false;
  let i = 3;

  while (i > 0 && ingresar == false) {
    let userPass = prompt("Ingrese su password. Tiene " + i + " intentos");

    if (userPass == savedPass) {
      alert("Bienvenido al carrito comunista");
      ingresar = true;
    } else {
      i--;
      alert("Error de password, le quedan " + i + " intentos");
    }
  }

  return ingresar;
}

function envio() {
  alert("Complete el formulario para realizar el envio");
  const nombreCliente = prompt("Ingrese su nombre y apellido");
  const direccionCliente = prompt("Ingrese su direccion");
  const localidadCliente = prompt("Ingrese la localidad donde se encuentra");
  const codigoPostalCliente = prompt("Ingrese su codigo postal");

  datosCliente.push(
    new Cliente(
      nombreCliente,
      direccionCliente,
      localidadCliente,
      codigoPostalCliente
    )
  );

  
  
  for (const datosLista of datosCliente) {
      let contenedor = document.createElement("li");
      contenedor.innerHTML = `Datos para el envio:
                                <h4> ${datosLista.nombre}<h4>
                                <h4> ${datosLista.direccion}<h4>
                                <h4> ${datosLista.localidad}<h4>
                                <h4> ${datosLista.codigoPostal}<h4>`;
                                console.log(carritoDiv);
                                document.body.appendChild(carritoDiv);
                                // "Confirme los datos para el envio:\n" +
                                //   producto.nombre +
                                //   "\n" +
                                //   producto.direccion +
                                //   "\n" +
                                //   producto.localidad +
                                //   "\n" +
                                //   producto.codigoPostal
                                
                              };
};

// Main
const drago = new Cerveza("roja", "Drago", 100, 7, 1);
const larry = new Cerveza("negra", "Larry guaits", 100, 7, 1);
const apollo = new Cerveza("negra", "Apollo", 100, 7, 1);
const trigo = new Cerveza("rubia", "Ahora con trigo", 100, 7, 1);
const carrito = new Carrito();
const datosCliente = [];
let carritoDiv= document.getElementsByClassName ('carritoLista');

const ingreso = logIn();

if (ingreso) {
  const menuCervezas = `Elegí una cereveza del menú:
    [1] ${drago.nombre} - ${drago.estilo} $${drago.precio}
    [2] ${larry.nombre} - ${larry.estilo} $${larry.precio}
    [3] ${apollo.nombre} - ${apollo.estilo} $${apollo.precio}
    [4] ${trigo.nombre} - ${trigo.estilo} $${trigo.precio}
    [0] Terminar seleccion.`;

  let opcion;
  let salir = false;
  //let birraElegida;

  do {
    opcion = prompt(menuCervezas);

    switch (opcion) {
      case "1":
        //birraElegida = drago;
        //salir = true;
        carrito.sumar(drago);
        break;

      case "2":
        //birraElegida = larry;
        //salir = true;
        carrito.sumar(larry);
        break;

      case "3":
        //birraElegida = apollo;
        //salir = true;
        carrito.sumar(apollo);
        break;

      case "4":
        //birraElegida = trigo;
        //salir = true;
        carrito.sumar(trigo);
        break;

      case "0":
        salir = true;
        break;

      default:
        alert("Opcion no valida");
        break;
    }
  } while (opcion < "0" || opcion > "4" || salir == false);

  carrito.listar();

  //   let birraCantidad = prompt(
  //     "¿Cuantas unidades de " + birraElegida.nombre + " queres?"
  //   );
  //   while (isNaN(birraCantidad) || birraCantidad <= 0) {
  //     if (isNaN(birraCantidad)) {
  //       alert("Ingresa un numero");
  //     } else {
  //       alert("Cantidad incorrecta");
  //     }
  //     birraCantidad = prompt(
  //       "¿Cuantas unidades de " + birraElegida.nombre + " queres?"
  //     );
  //   }

  //   let total = birraElegida.totalIva() * birraCantidad;

  //   const ticket =
  //     birraElegida.nombre +
  //     ":\n" +
  //     birraCantidad +
  //     "x" +
  //     birraElegida.precio +
  //     "\n Total: $" +
  //     total;

  //   alert(ticket);
}

const tarea = envio();
