// Funciones
function logIn() {

    let savedPass = "birra";
    let ingresar = false;
    let i = 3;

    while (i > 0 && ingresar == false) {
        let userPass = prompt('Ingrese su password. Tiene ' + (i) + ' intentos');

        if (userPass == savedPass) {
            alert("Bienvenido al carrito comunista")
            ingresar = true;
        } else {
            i--;
            alert("Error de password, le quedan " + (i) + " intentos");
        }
    }

    return ingresar
}

// Clases
class Cerveza {
    constructor(estilo, nombre, precio, litros) {
        this.estilo = estilo;
        this.nombre = nombre;
        this.precio = (precio < 0) ? 0 : precio;
        // this.precio = parseFloat(precio);
        this.litros = (litros < 0) ? 0 : litros;
        this.vendido = false
    }
    totalIva() {
        return this.precio * 1.21;
    }
    vender() {
        this.vendido = true;
    }
}

// Main
const drago = new Cerveza("roja", "Drago", 100, 7);
const larry = new Cerveza("negra", "Larry guaits", 100, 7);
const apollo = new Cerveza("negra", "Apollo", 100, 7);
const trigo = new Cerveza("rubia", "Ahora con trigo", 100, 7);

const ingreso = logIn()

if (ingreso) {

    const menuCervezas = `Elegí una cereveza del menú:
    [1] ${drago.nombre} - ${drago.estilo} $${drago.precio}
    [2] ${larry.nombre} - ${larry.estilo} $${larry.precio}
    [3] ${apollo.nombre} - ${apollo.estilo} $${apollo.precio}
    [4] ${trigo.nombre} - ${trigo.estilo} $${trigo.precio}
    [0] Salir.`;

    let opcion ;
    let salir = false;
    let birraElegida;

    do {
        opcion = prompt(menuCervezas)

        switch (opcion) {
            case '1':
                birraElegida = drago;
                salir = true;
                break;

            case '2':
                birraElegida = larry;
                salir = true;
                break;

            case '3':
                birraElegida = apollo;
                salir = true;
                break;

            case '4':
                birraElegida = trigo;
                salir = true;
                break;

            case '0':
                salir = true;
                break;

            default:
                alert ('Opcion no valida');
                break;
        }
        
    } while (opcion < "0" || opcion > "4" && salir == false); 
    
    let birraCantidad = prompt ("¿Cuantas unidades de " + birraElegida.nombre + " queres?");

    while (birraCantidad < 0) {
        // Como evitar un ingreso no numerico (letras)?
        alert ('Cantidad incorrecta');
        birraCantidad = prompt ("¿Cuantas unidades de " + birraElegida.nombre + " queres?");
    } 

    let total = birraElegida.totalIva() * birraCantidad;

    const ticket = birraElegida.nombre + ":\n" 
                    + birraCantidad + "x" + birraElegida.precio + 
                    "\n Total: $" + total;

    alert(ticket);
    


}