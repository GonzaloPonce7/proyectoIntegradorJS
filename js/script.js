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
    this.cervezas = [];
  };

  agregar(cerveza, cantidad) {
    let item = this.cervezas.find((item) => item.cerveza == cerveza);
    item == undefined? this.cervezas.push(Item(cerveza, cantidad)): cerveza.agregar(cantidad);
    // if(item != undefined) {
    //     item.agregar(cantidad)
    // } else {
    //     this.cervezas.push(Item(cerveza,cantidad));
    // };
  };

  incrementar(cerveza) {
    //buscar si la cerveza se encuentra dentro de la lista.
    //Si no la encuentra, agregar.
    //Si la encuentra cantidad++
    let cervezaBuscada = this.cervezas.find(
      (el) => el.nombre == cerveza.nombre
    );
    cervezaBuscada.cantidad++;
    // if (cervezaBuscada == undefined) {
    //   this.cervezas.push(cerveza);
    // } else {
    //   cervezaBuscada.cantidad++;
    // };
  };

  borrar(cerveza) {
    //buscar si la cerveza se encuentra dentro de la lista.
    //si la encuentra, borrar
    //si no la encuentra, no hacer nada
    let listafiltrada = this.cervezas.filter(
      (el) => el.nombre != cerveza.nombre
    );
    this.cervezas = listafiltrada;
  };

  vaciar() {
    this.cervezas = [];
  };

  decrementar(cerveza) {
    //buscar si la cerveza se encuentra dentro de la lista.
    //si la encuentro, restar cantidad
    //si no la encuentro, no hace nada.
    let cervezaBuscada = this.cervezas.find(
      (el) => el.nombre === cerveza.nombre
    );
    if (cervezaBuscada != undefined) {
      cervezaBuscada.cantidad--;
    };
  };

  //Corregir listar
  listar() {
    let texto = "";
    this.cervezas.forEach((e) => (texto += e.mostrar()));
    texto += "Total: $" + this.total();
    alert(texto);
  };

  guardarEnStorage(storage = "session") {
    const tipoStorage = storage === "local" ? localStorage : sessionStorage;
    tipoStorage.setItem("itemsCarrito", JSON.stringify(this.cervezas));
  };

  recuperarDeStorage(storage = "session") {
    const tipoStorage = storage === "local" ? localStorage : sessionStorage;
    let delStorage = tipoStorage.getItem("itemCarrito");
    //Si hay un json en el storage, parsear para this.items []. Si no, this.items = [].
    //(delStorage == undefined) ? this.cervezas = [] : this.cervezas = JSON.parse(tipoStorage.getItem('itemsCarrito'));
    this.cervezas =
      delStorage == undefined ? [] : JSON.parse(tipoStorage.getItem("itemsCarrito"));
  };

  totalIva() {
    return this.precio * this.cantidad * 1.21;
  };

  total() {
    //Sumar totalIva de cada cerveza y return
    let total = 0;
    this.cervezas.precio.forEach((e) => (total += e.totalIva()));
    return total;
  };
};

//Funciones Dom

//Revisar por que no se muestra la imagen en el comentario html.
function mostrarCervezasEnDOM(array) {
  const divCarritoItems = document.getElementById("carritoDiv");
  //tomo el div del html y le creo el html dinamico
  divCarritoItems.innerHTML = "";
  array.forEach((element) => {
    let html = `<div class="card cardMascota" id="tarjeta${element.nombre}">
              <h3 class="card-header">Nombre: ${element.nombre}</h3>
              <img src="../img/Dragon.png" alt=${element.nombre} class="card-img-bottom">
              <!-- <img src=${element.img} alt=${element.nombre} class="card-img-bottom"> -->
              <div class="card-body">
                  <p class="card-text">Estilo: ${element.estilo}</p>
                  <p class="card-text">Precio: ${element.precio}</p>
                  <p class="card-text">Litros: ${element.litros}</p>
              </div>
              <button type="button" class="agregarCarrito">Agregar al carrito</button>
              </div>`;
    divCarritoItems.innerHTML += html;
    console.log("mostrarCervezas");
  });
}

function mostrarCarrito() {
  
  listaSeleccion.innerHTML = "";
  cervezas.forEach((item) => {
    listaSeleccion.innerHTML += `
    <div class="card-head">
    <h3>${item.nombre}</h3>
    <p>${item.estilo}</p>
    <p>${item.cantidad}</p>
    </div>
    <button class="deleteBtn">Borrar</button>
    </div>`;
  });

  for (const btn of deleteBtn) {
    btn.addEventListener("click", (e) => {
      borrar(e.target.cerveza.value);
      mostrarCarrito();
    });
  }
  
  //Modificar y ordenar
  agregarbtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Ejecuto la función para agregar
    agregar();
    mostrarCarrito(); // Actualiza la pantalla
  });
};

// Funciones

function envio() {
  
  
  function formAlert() {
    alert("Envio confirmado. Muchas gracias");
  }
  
  // const addDatosCliente = (nombre, direccion, localidad, codigoPostal) => {
    //   const newCliente = new Cliente(nombre, direccion, localidad, codigoPostal);
    //   datosCliente.push(newCliente);
    // };
    
    btnEnvio.addEventListener("click", () => {
      formAlert();
    });
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      cliente.nombre = e.target.nombre.value;
      cliente.direccion = e.target.direccion.value;
      cliente.localidad = e.target.localidad.value;
      cliente.codigoPostal = e.target.codigoPostal.value;
      
      console.log(cliente);
      mostrarListaCliente(cliente);
    });
    
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
    new Cerveza("roja", "Drago", 100, 7, 1, "./img/Dragon.png"),
    new Cerveza("negra", "Larry guaits", 100, 7, 1, "./img/Dragon.png"),
    new Cerveza("negra", "Apollo", 100, 7, 1, "./img/Dragon.png"),
    new Cerveza("rubia", "Ahora con trigo", 100, 7, 1, "./img/Dragon.png"),
  ];
  
  //Variables globales
  const carrito = new Carrito();
  const cliente = new Cliente();
  
  //elementos del DOM
  const main = document.getElementById("main");
  const listaSeleccion = document.getElementById('listaSeleccion');
  const deleteBtn = document.getElementsByClassName('deleteBtn');
  const agregarbtn = document.getElementsByClassName('agregarCarrito');
  const form = document.getElementById("formCliente");
  const btnEnvio = document.getElementById("boton");
  
  //Ejecucion funciones del DOM
  const mostrar = mostrarCervezasEnDOM(cervezas);
  const tarea = envio();
  const mCarrito = mostrarCarrito();
  