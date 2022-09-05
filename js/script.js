// Clases
class Cliente {
  constructor(nombre, direccion, localidad, codigoPostal) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.localidad = localidad;
    this.codigoPostal = codigoPostal;
  };
};

class Pedido {
  constructor(cliente, carrito) {
	this.cliente = cliente;
	this.items = carrito.items;
  };
};

class Item {
  constructor(cerveza, cantidad) {
    this.cerveza = cerveza;
    this.cantidad = cantidad;
  };
};

class Carrito {
  constructor() {
    this.items = [];
  };

  agregar(cerveza, cantidad) {
    console.log('agregar => cerveza:',JSON.stringify(cerveza));
    let item = this.items.find((item) => item.cerveza.id == cerveza.id);
    item ? item.cantidad ++ : this.items.push (new Item (cerveza,cantidad));
    console.log('agregar => item:',JSON.stringify(this.items));
  };

  borrar(item) {
    let listafiltrada = this.items.filter(
      (el) => el != item
    );
    this.items = listafiltrada;
  };
  
  vaciar() {
    this.items = [];
  };
  
  incrementar(item) {
    item.cantidad++
  };
  
  decrementar(item) {
    item.cantidad > 0 && item.cantidad--
  };

  totalIva(item) {
    return item.cerveza.precio * item.cantidad * 1.21;
  };

  total() {
    //Sumar totalIva de cada cerveza y return
    let total = 0;
    this.items.forEach((e) => (total += this.totalIva(e)));
    return total;
  };
};


//Funciones Dom

function mostrarCervezasEnDOM(data) {

  divCarritoItems.innerHTML = "";
  data.forEach((element, i) => {
    let html = `<div class="card" id="tarjeta${element.nombre}">
    <h3 class="card-header">Nombre: ${element.nombre}</h3>
    <img src=${element.img} alt=${element.nombre} class="card-img-bottom"> 
    <div class="card-body">
    <p class="card-text">Estilo: ${element.estilo}</p>
    <p class="card-text">Precio: ${element.precio}</p>
    <p class="card-text">Litros: ${element.litros}</p>
    </div>
    <button class="agregarCarrito" id="agregarCarrito" type="button" data-id="${element.id}" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Agregar</button>
    </div>`;
    divCarritoItems.innerHTML += html;
  });
};

function mostrarCarrito() {
  
  listaSeleccion.innerHTML = "";
  carrito.items.forEach((item, i) => {
    listaSeleccion.innerHTML += `
    <div class="card-head">
    <h3>${item.cerveza.nombre}</h3>
    <p>${item.cerveza.estilo}</p>
    <label for="cantidad_${i}">Cantidad</label>
    <button data-id="${item.cerveza.id}" class="decrementarBtn">-</button>
    <p id="cantidad_${i}" type="number"  min="0">${item.cantidad}</p>
    <button data-id="${item.cerveza.id}" class="incrementarBtn">+</button> 
    <button data-id="${item.cerveza.id}" class="deleteBtn">Borrar</button>
    </div>`;
  });

  totalDiv.innerHTML = `
  <p>Total + iva = ${carrito.total()}</p>`;

  for (const btn of deleteBtn) {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute('data-id');
      const itemElegido = carrito.items.find(e => e.cerveza.id == id);
      carrito.borrar(itemElegido);
      mostrarCarrito();
      guardarCarrito();
    });
  }

  for (const btn of decrementarBtns) {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute('data-id');
      const itemElegido = carrito.items.find(e => e.cerveza.id == id);
      carrito.decrementar(itemElegido);
      mostrarCarrito();
    });
  };

  for (const btn of incrementarBtns) {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute('data-id');
      const itemElegido = carrito.items.find(e => e.cerveza.id == id);
      carrito.incrementar(itemElegido);
      mostrarCarrito();
    });
  };
};

// Funciones
function guardarCarrito() {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
};

function recuperarCarrito() {
  return Object.assign(new Carrito(), JSON.parse(sessionStorage.getItem("carrito")));
};

const fetchCatalogo = async () => {
  const resp = await fetch('/catalogo.json')
  const dataCervezas = await resp.json()
  mostrarCervezasEnDOM(dataCervezas);
  cervezas = dataCervezas
  agregarbtn = document.getElementsByClassName('agregarCarrito');
  for (let i = 0; i < agregarbtn.length; i++) {
    agregarbtn[i].addEventListener("click", (e) => {
      const id = e.target.getAttribute('data-id');
      const cervezaElegida = cervezas.find(e => e.id == id);
      carrito.agregar(cervezaElegida, 1);
      mostrarCarrito();
      guardarCarrito();
    });
  };  
};

// Main

//Variables globales
const carrito = recuperarCarrito() || new Carrito();
const cliente = new Cliente();
let agregarbtn = undefined;
let cervezas = [];
fetchCatalogo()

//elementos del DOM
const main = document.getElementById("main");
const listaSeleccion = document.getElementById('listaSeleccion');
const deleteBtn = document.getElementsByClassName('deleteBtn');
const incrementarBtns = document.getElementsByClassName('incrementarBtn');
const decrementarBtns = document.getElementsByClassName('decrementarBtn');
const form = document.getElementById("formCliente");
const btnEnvio = document.getElementById("boton");
const btnComprar = document.getElementById("btnComprar");
const btnVaciar = document.getElementById("btnVaciar")
const divCarritoItems = document.getElementById("carritoDiv");
const totalDiv = document.getElementById("total");

//Ejecucion funciones del DOM
const mCarrito = mostrarCarrito();

// Eventos

btnVaciar.addEventListener("click", () => {
  carrito.vaciar(carrito);
  mostrarCarrito()
  guardarCarrito()
});

btnComprar.addEventListener("click", async ()=>{

  const { value: formValues } = await Swal.fire({
    title: 'Formulario de Envio',
    html:`
    <label>Nombre y Apellido: </label>
    <input id="swal-input1" name="name" class="swal2-input">
    <label>Direccion: </label> 
    <input id="swal-input2" name="direccion" class="swal2-input">
    <label>Localidad: </label> 
    <input id="swal-input3" name="localidad" class="swal2-input">
    <label>Codigo Postal: </label> 
    <input id="swal-input4" name="codigo" class="swal2-input">`,
    focusConfirm: false,
    preConfirm: () => {
      return {
        'nombre':document.getElementById('swal-input1').value,
        'direccion':document.getElementById('swal-input2').value,
        'localidad':document.getElementById('swal-input3').value,
        'codigoPostal':document.getElementById('swal-input4').value,
      };
    }
  });

  if (formValues) {
    Swal.fire(`Gracias ${formValues.nombre} por tu compra`);
    const nuevoCliente = new Cliente(formValues.nombre, formValues.direccion, formValues.localidad, formValues.codigoPostal);
    const nuevoPedido = new Pedido(nuevoCliente,carrito);
    localStorage.setItem("pedido",JSON.stringify(nuevoPedido));
    console.log(nuevoPedido);
    fetch ('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(nuevoPedido),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  };
});