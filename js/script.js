// Clases
class Cerveza {
  constructor(estilo, nombre, precio, litros, img) {
    this.estilo = estilo;
    this.nombre = nombre;
    this.precio = precio < 0 ? 0 : precio;
    // this.precio = parseFloat(precio);
    this.litros = litros < 0 ? 0 : litros;
    this.img = img;
  }

  toString() {
    return "Nombre: " + this.nombre + " x " + this.cantidad;
  }
}

class Cliente {
  constructor(nombre, direccion, localidad, codigoPostal) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.localidad = localidad;
    this.codigoPostal = codigoPostal;
  }
}

class Item {
  constructor(cerveza, cantidad) {
    this.cerveza = cerveza;
    this.cantidad = cantidad;
  };

  agregar(cantidad) {
    this.cantidad += cantidad;
  };

  tieneDescuento() {
    return this.cantidad > cantidadDescuento;
  };

  subtotal() {
    if (this.tieneDescuento()) {
      return this.cantidad * this.cerveza.precio * 0.9;
    }
    return this.cantidad * this.cerveza.precio;
  };
};

class Carrito {
  constructor() {
    this.recuperarDeStorage();
    this.items = [];
  };

  agregar(cerveza, cantidad) {
    let item = this.items.find((item) => item.cerveza.nombre == cerveza.nombre);
    item ? this.incrementar(cerveza) : this.items.push (new Item (cerveza,cantidad));
  };

  incrementar(cerveza) {
    //buscar si la cerveza se encuentra dentro de la lista.
    //Si no la encuentra, agregar.
    //Si la encuentra cantidad++
    const indice = this.items.findIndex((item) => item.cerveza.nombre === cerveza.nombre)
    this.items[indice].cantidad++;
  };

  borrar(cerveza) {
    //buscar si la cerveza se encuentra dentro de la lista.
    //si la encuentra, borrar
    //si no la encuentra, no hacer nada
    let listafiltrada = this.items.filter(
      (el) => el.cerveza != cerveza
    );
    this.items = listafiltrada;
  };

  vaciar() {
    this.items = [];
  };

  decrementar(cerveza) {
    //buscar si la cerveza se encuentra dentro de la lista.
    //si la encuentro, restar cantidad
    //si no la encuentro, no hace nada.
    let cervezaBuscada = this.items.find(
      (el) => el.nombre === cerveza.nombre
    );
    if (cervezaBuscada != undefined) {
      cervezaBuscada.cantidad--;
    };
  };

  //Corregir listar
  listar() {
    let texto = "";
    this.items.forEach((e) => (texto += e.mostrar()));
    texto += "Total: $" + this.total();
  };

  guardarEnStorage(storage = "session") {
    const tipoStorage = storage === "local" ? localStorage : sessionStorage;
    tipoStorage.setItem("itemsCarrito", JSON.stringify(this.items));
  };

  //Usar funcion
  recuperarDeStorage(storage = "session") {
    const tipoStorage = storage === "local" ? localStorage : sessionStorage;
    let delStorage = tipoStorage.getItem("itemCarrito");
    //Si hay un json en el storage, parsear para this.items []. Si no, this.items = [].
    //(delStorage == undefined) ? this.items = [] : this.items = JSON.parse(tipoStorage.getItem('itemsCarrito'));
    this.items =
      delStorage == undefined ? [] : JSON.parse(tipoStorage.getItem("itemsCarrito"));
  };

  totalIva() {
    return this.precio * this.cantidad * 1.21;
  };

  total() {
    //Sumar totalIva de cada cerveza y return
    let total = 0;
    this.items.precio.forEach((e) => (total += e.totalIva()));
    return total;
  };
};

//Funciones Dom

//Revisar por que no se muestra la imagen en el comentario html.
function mostrarCervezasEnDOM(array) {
  const divCarritoItems = document.getElementById("carritoDiv");
  //tomo el div del html y le creo el html dinamico
  divCarritoItems.innerHTML = "";
  array.forEach((element, i) => {
    let html = `<div class="card" id="tarjeta${element.nombre}">
              <h3 class="card-header">Nombre: ${element.nombre}</h3>
              <!--<img src="../img/Dragon.png" alt=${element.nombre} class="card-img-bottom">-->
              <img src=${element.img} alt=${element.nombre} class="card-img-bottom"> 
              <div class="card-body">
                  <p class="card-text">Estilo: ${element.estilo}</p>
                  <p class="card-text">Precio: ${element.precio}</p>
                  <p class="card-text">Litros: ${element.litros}</p>
              </div>
              <button type="button" data-id="${i}" class="agregarCarrito">Agregar al carrito</button>
              </div>`;
    divCarritoItems.innerHTML += html;
    console.log("mostrarCervezas");
  });
}

function mostrarCarrito() {
  
  listaSeleccion.innerHTML = "";
  carrito.items.forEach((item, i) => {
    listaSeleccion.innerHTML += `
    <div class="card-head">
    <h3>${item.cerveza.nombre}</h3>
    <p>${item.cerveza.estilo}</p>
    <label for="cantidad_${i}">Cantidad</label>
    <input id="cantidad_${i}" type="number" value="${item.cantidad}" min="0"> 
    <!--<p>${item.cantidad}</p>-->
    <button data-id="${i}" class="deleteBtn">Borrar</button>
    </div>`;
  });
  for (const btn of deleteBtn) {
    btn.addEventListener("click", (e) => {
      const indice = e.target.getAttribute('data-id');
      const cervezaElegida = carrito.items[indice].cerveza;
      carrito.borrar(cervezaElegida);
      mostrarCarrito();
    });
  }
};

// Funciones

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

function recuperarCarrito() {
    return Object.assign(new Carrito(), JSON.parse(localStorage.getItem("carrito")));
};

function envio() {
  
  // const addDatosCliente = (nombre, direccion, localidad, codigoPostal) => {
  // const newCliente = new Cliente(nombre, direccion, localidad, codigoPostal);
  // datosCliente.push(newCliente);
  // };
  
  
  
  const mostrarListaCliente = (cliente) => {
      let contenedor = document.getElementById("listaCliente");
      contenedor.innerHTML = `
      <span>Datos para el envio:<span>
      <h4> ${cliente.nombre}<h4>
      <h4> ${cliente.direccion}<h4>
      <h4> ${cliente.localidad}<h4>
      <h4> ${cliente.codigoPostal}<h4>`;
    };
};

// Main

//Catalogo
const cervezas = [
  new Cerveza("roja", "Drago", 100, 7, 1, "https://drive.google.com/file/d/1BTsxURRFrh9zMr4-JlOJ4Ov59JzELn0_/view?usp=sharing"),
  new Cerveza("negra", "Larry guaits", 100, 7, 1, "https://drive.google.com/file/d/1jBMgHcF4wHkqnvNBCkG9y_9mXfT-nffQ/view?usp=sharing"),
  new Cerveza("negra", "Apollo", 100, 7, 1, "https://drive.google.com/file/d/1DWp2POd9a-Z-nyCNZeVbllYi5YmnVYFd/view?usp=sharing"),
  new Cerveza("rubia", "Ahora con trigo", 100, 7, 1, "https://drive.google.com/file/d/1mayTiyZX36uuIVHdgO0xleNuM828Fk2-/view?usp=sharing"),
];

//Variables globales
//const carrito = recuperarCarrito() == undefined ? recuperarCarrito() : new Carrito();
const carrito = recuperarCarrito() || new Carrito();
const cliente = new Cliente();

//elementos del DOM
const main = document.getElementById("main");
const listaSeleccion = document.getElementById('listaSeleccion');
const deleteBtn = document.getElementsByClassName('deleteBtn');
const agregarbtn = document.getElementsByClassName('agregarCarrito');
const form = document.getElementById("formCliente");
const btnEnvio = document.getElementById("boton");
const btnComprar = document.getElementById("btnComprar");

//Ejecucion funciones del DOM
const mostrar = mostrarCervezasEnDOM(cervezas);
const mCarrito = mostrarCarrito();
//const tarea = envio();


// Eventos

//Modificar y ordenar
for (const btn of agregarbtn) {
  btn.addEventListener("click", (e) => {
    const indice = e.target.getAttribute('data-id');
    const cervezaElegida = cervezas[indice];
    console.log(cervezaElegida)
    // Ejecuto la función para agregar
    carrito.agregar(cervezaElegida, 1);
    mostrarCarrito(); // Actualiza la pantalla
    guardarCarrito();
  });
};

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     cliente.nombre = e.target.nombre.value;
//     cliente.direccion = e.target.direccion.value;
//     cliente.localidad = e.target.localidad.value;
//     cliente.codigoPostal = e.target.codigoPostal.value;

//     console.log(cliente);
//     mostrarListaCliente(cliente);
// });

btnComprar.addEventListener("click", ()=>{
  (async () => {
  
    const { value: formValues } = await Swal.fire({
      title: 'Formulario de Envio',
      html:
      '<span>Nombre y Apellido: </span>' + 
      '<input id="swal-input1" class="swal2 input">'+'<br>'+
      '<span>Direccion: </span>'
      +'<input id="swal-input2" class="swal2-input">' +
      '<span>Localidad: </span>'
      +'<input id="swal-input3" class="swal2-input">'+'<br>'+
      '<span>Codigo Postal: </span>'+ '<br>' +
      '<input id="swal-input4" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value,
        ]
      }
    })
    
    if (formValues) {
      Swal.fire(JSON.stringify(formValues))
      cliente.nombre = e.target.input1.value;
      cliente.direccion = e.target.input2.value;
      cliente.localidad = e.target.input3.value;
      cliente.codigoPostal = e.target.input4.value;
    }
    
    })()

})