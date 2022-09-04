let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar_ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'
    
    let botonMascotaJugador = document.getElementById('boton_mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton_fuego')
    botonFuego.addEventListener('click', ()=>{
         ataqueJugador = 'FUEGO'
        ataqueAleatorioEnemigo()
        })
    let botonAgua = document.getElementById('boton_agua')
    botonAgua.addEventListener('click', ()=>{
         ataqueJugador = 'AGUA'
        ataqueAleatorioEnemigo()
        })
    let botonTierra = document.getElementById('boton_tierra')
    botonTierra.addEventListener('click', ()=>{
         ataqueJugador = 'TIERRA'
        ataqueAleatorioEnemigo()
        })

    let botonReiniciar = document.getElementById('boton_reiniciar')
    botonReiniciar.addEventListener('click', ()=> location.reload())
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById('seleccionar_mascota')    
    let sectionSeleccionarAtaque = document.getElementById('seleccionar_ataque')
    let spanMascotaJugador = document.getElementById('mascota_jugador')
    let inputMascotasJugador = document.getElementsByName('mascota')
    let lengthMacotas=inputMascotasJugador.length
      for (let index = 0; index < lengthMacotas; index++) {
        let input = document.getElementById(inputMascotasJugador[index].id);
        //.toUpperCase() convierte la cadena en mayusculas
        //slice() Esto crea una nueva cadena comenzando desde el índice especificado hasta el final de la palabra
        if (input.checked) {            
            spanMascotaJugador.innerHTML = (input.id)[0].toUpperCase()+ (input.id).slice(1)
            sectionSeleccionarAtaque.style.display = 'block'
            sectionSeleccionarMascota.style.display = 'none'
            seleccionarMascotaEnemigo(lengthMacotas,inputMascotasJugador)
            break
        }else{
            if(index==(lengthMacotas-1)){
                alert('Selecciona una mascota')
        }}
      }
}

function seleccionarMascotaEnemigo(lengthMacotas,nombreMascotas) {
    console.log('seleccionar mascota')
    let mascotaAleatoria = aleatorio(1,lengthMacotas)
    let spanMascotaEnemigo = document.getElementById('mascota_enemigo')

    for (let index = 1; index <= lengthMacotas; index++) {
        console.log(nombreMascotas[index-1].id)
        if (mascotaAleatoria==index) {            
            spanMascotaEnemigo.innerHTML = (nombreMascotas[index-1].id)[0].toUpperCase()+(nombreMascotas[index-1].id).slice(1)
            break
        }
      }
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas_jugador')
    let spanVidasEnemigo = document.getElementById('vidas_enemigo')
    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('section_mensajes')
    
    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu mascota ataca con ' + ataqueJugador + ', las mascota del enemigo ataca con ' + ataqueEnemigo + '- ' + resultado

    sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('section_mensajes')
    
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal

    sectionMensajes.appendChild(parrafo)

    let botonFuego = document.getElementById('boton_fuego')
    botonFuego.disabled = true
    let botonAgua = document.getElementById('boton_agua')
    botonAgua.disabled = true
    let botonTierra = document.getElementById('boton_tierra')
    botonTierra.disabled = true

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)