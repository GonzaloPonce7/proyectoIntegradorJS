
function logIn() {
    
    let savedPass = birra;
    let ingresar = false;
    let i = 2;
    while (i >=0 && (ingresar = true)) {
        i--;
        let userPass = prompt ('Ingrese su password. Tiene ' +(i+1)+ ' intentos');
        switch (userPass) {
            case userPass:
                if (userPass == savedPass) {
                    alert ("Bienvenido al carrito comunista")
                    ingresar = true;
                } 
                break;

            default:
                alert ("Error de password, le quedan " + i + " intentos");
                break;
        }
        } 
        
    } 

class cerveza {
    constructor (estilo, nombre, precio, litros) {
        this.estilo = estilo;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.litros = litros
        this.vendido = false
    }
    sumaIva(){
        this.precio = this.precio * 1.21;
    }
    vender() {
        this.vendido = true;
    }
}

const drago = new cerveza("roja", "Drago", "100", "7");
const larry = new cerveza("negra", "Larry guaits", "100", "7");
const apollo = new cerveza("negra", "Apollo", "100", "7");
const trigo = new cerveza("rubia", "Ahora con trigo", "100", "7");

