/*const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado = document.getElementById("cifrado")

//función para cifrar
function cifrado(){
    //declarar texto a ingresar
    const textoIngresado = texto.value;
    textoCifrado.value = textoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);
        if(valorEntero >= 97 && valorEntero <= 122){
            const valorDesplazamiento = parseInt(desplazamiento.value);

            if(valorEntero + valorDesplazamiento > 122){
                valorEntero = 97 + (valorEntero - 122) + valorDesplazamiento - 1;
            }
            else{
                valorEntero = valorEntero + valorDesplazamiento;
            }
        } 
        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');
}

texto.addEventListener("keyup", cifrado);
desplazamiento.addEventListener("change", cifrado);

//función para descifrar
function descifrado(){
    const textoCifradoIngresado = textoCifrado.value;
    texto.value = textoCifradoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);

        if(valorEntero >= 97 && valorEntero <= 122){
            const valorDesplazamiento = parseInt(desplazamiento.value);

            if(valorEntero - valorDesplazamiento < 97){
                valorEntero = 122 - (97 - valorEntero) + valorDesplazamiento + 1;
            }
            else{
                valorEntero = valorEntero - valorDesplazamiento;
            }
        } 
        let descifrado = String.fromCharCode(valorEntero);
        return mayus ? descifrado.toUpperCase() : descifrado;
    }).join('');
}

// Puedes agregar un evento para que cuando el texto cifrado cambie, se descifre automáticamente
textoCifrado.addEventListener("keyup", descifrado);


//TAREA
//descifrar 
//subir a github

*/

function cifrarCesar() {
    const clave = obtenerClave();
    if (clave === null) return;

    const mensaje = document.getElementById("mensaje").value;
    const textoCifrado = aplicarCifrado(mensaje, clave);
    mostrarResultado(textoCifrado);
}

function descifrarCesar() {
    const clave = obtenerClave();
    if (clave === null) return;

    const mensaje = document.getElementById("mensaje").value;
    const textoDescifrado = aplicarCifrado(mensaje, -clave); // Descifrar es cifrar con el negativo de la clave
    mostrarResultado(textoDescifrado);
}

function obtenerClave() {
    const clave = document.getElementById("clave").value;
    if (clave.match(/^[a-zA-Z]$/)) {
        return clave.toLowerCase().charCodeAt(0) - 97;
    } else if (!isNaN(clave)) {
        return parseInt(clave);
    } else {
        alert("La clave debe ser un número o una letra.");
        return null;
    }
}

function aplicarCifrado(mensaje, clave) {
    let resultado = "";
    for (let i = 0; i < mensaje.length; i++) {
        const char = mensaje[i];
        if (char.match(/[a-z]/i)) {
            const code = mensaje.charCodeAt(i);
            if (char === char.toUpperCase()) {
                //C = M + Kmod|26|
                //C = 75 , K = 3 => 13 % 26 = 13
                //C = 90, K = 3 => 28%26 = 2
                //C = 65, K = 3 => 3%26 = 3 + 26 = 29 % 26 = 3 + 65 = 68
                resultado += String.fromCharCode(((code - 65 + clave) % 26 + 26) % 26 + 65);
            } else {
                resultado += String.fromCharCode(((code - 97 + clave) % 26 + 26) % 26 + 97);
            }
        } else {
            resultado += char;
        }
    }
    return resultado;
}

function mostrarResultado(resultado) {
    document.getElementById("resultado").textContent = resultado;
}