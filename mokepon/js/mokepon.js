const selectionAttack = document.getElementById('seleccionar_ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const buttonFire = document.getElementById('boton_fuego')
const buttonWater = document.getElementById('boton_agua')
const buttonEarth = document.getElementById('boton_tierra')
const resultadoBatalla = document.getElementById('resultado_batalla')
const botonMascotaJugador = document.getElementById('boton_mascota')
const botonReiniciar = document.getElementById('boton_reiniciar')
const selectionPet = document.getElementById('seleccionar_mascota')    
const spanMascotaJugador = document.getElementById('mascota_jugador')
const inputPetPlayer = document.getElementsByName('mascota')
const mensajeAtaqueJugador = document.getElementById('mensaje_ataque_jugador')
const mensajeAtaqueEnemigo = document.getElementById('mensaje_ataque_enemigo')
const spanVidasJugador = document.getElementById('vidas_jugador')
const spanVidasEnemigo = document.getElementById('vidas_enemigo')
const spanMascotaEnemigo = document.getElementById('mascota_enemigo')
const contentTarjetas=document.getElementById('contenedor tarjetas')

let optionMokepones=''
let mokepones=[]
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon{
    constructor(nombre,foto,vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques=[]
    }
}

let wolfice = new Mokepon('Wolfice','assets/wolfice.png',5)

let dracarie =new Mokepon('Dracarie','assets/dracarie.webp',5)

let bearags = new Mokepon('Bearags','assets/bearags.webp',5)

let fexfire = new Mokepon('Fexfire','assets/fexfire.png',5)
let cerberus = new Mokepon('Cerberus','assets/cerberus.png',5)
let lionfire = new Mokepon('Lionfire','assets/lionfire.webp',5)

wolfice.ataques.push(
    {nombre: '🧊',id:'buttonIce'},
    {nombre: '🧊',id:'buttonIce'},
    {nombre: '🧊',id:'buttonIce'},
    {nombre: '💧',id:'buttonWater'},
    {nombre: '🪴',id:'buttonbuttonEarth'}
)

dracarie.ataques.push(
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '💧',id:'buttonWater'},
    {nombre: '🪴',id:'buttonbuttonEarth'}
)

bearags.ataques.push(
    {nombre: '🪴',id:'buttonbuttonEarth'},
    {nombre: '🪴',id:'buttonbuttonEarth'},
    {nombre: '🪴',id:'buttonbuttonEarth'},
    {nombre: '💧',id:'buttonWater'},
    {nombre: '🔥',id:'buttonFire'},
)

fexfire.ataques.push(
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '🪴',id:'buttonbuttonEarth'},
    {nombre: '💧',id:'buttonWater'},
)

cerberus.ataques.push(
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '🪴',id:'buttonbuttonEarth'},
    {nombre: '🪴',id:'buttonbuttonEarth'},
    {nombre: '💧',id:'buttonWater'},
)

lionfire.ataques.push(
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '🔥',id:'buttonFire'},
    {nombre: '🪴',id:'buttonbuttonEarth'},
    {nombre: '🪴',id:'buttonWater'},
)


mokepones.push(wolfice,dracarie,bearags,fexfire,cerberus,lionfire)
 

function iniciarJuego() {
    selectionAttack.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    
    mokepones.forEach((mokepon)=>{
        optionMokepones+=`
        <input type="radio" name="mascota" id="${mokepon.nombre}">
            <label class="tarjeta-mokepon" for="${mokepon.nombre}">
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}" alt="${mokepon.nombre}"> 
            </label>
        `
        contentTarjetas.innerHTML=optionMokepones
    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    buttonFire.addEventListener('click', ()=>{
         ataqueJugador = 'FUEGO 🔥'
        ataqueAleatorioEnemigo()   
        })

    buttonWater.addEventListener('click', ()=>{
         ataqueJugador = 'AGUA 💧'
        ataqueAleatorioEnemigo()
        })

    buttonEarth.addEventListener('click', ()=>{
         ataqueJugador = 'TIERRA 🪴'
        ataqueAleatorioEnemigo()
        })

    botonReiniciar.addEventListener('click', ()=> location.reload())
}

function seleccionarMascotaJugador() {

    let lengthPets=inputPetPlayer.length
      for (let index = 0; index < lengthPets; index++) {
        let input = document.getElementById(inputPetPlayer[index].id);
        if (input.checked) {            
            spanMascotaJugador.innerHTML = (input.id)
            selectionAttack.style.display = 'flex'
            selectionPet.style.display = 'none'
            seleccionarMascotaEnemigo()
            break
        }else{
            if(index==(lengthPets-1)){
                alert('Selecciona una mascota')
        }}
      }
}

function seleccionarMascotaEnemigo() {
    let petRamdom = aleatorio(0,mokepones.length-1)          
    spanMascotaEnemigo.innerHTML = mokepones[petRamdom].nombre
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO 🔥'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA 💧'
    } else {
        ataqueEnemigo = 'TIERRA 🪴'
    }

    combate()
}

function combate() {

    
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    } else if(ataqueJugador == 'FUEGO 🔥' && ataqueEnemigo == 'TIERRA 🪴') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'AGUA 💧' && ataqueEnemigo == 'FUEGO 🔥') {
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'TIERRA 🪴' && ataqueEnemigo == 'AGUA 💧') {
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
    

    
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
   
    resultadoBatalla.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML= ataqueJugador
    nuevoAtaqueEnemigo.innerHTML= ataqueEnemigo
    
    mensajeAtaqueJugador.appendChild(nuevoAtaqueJugador)
    mensajeAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {    
    let parrafo = document.createElement('p')
    resultadoBatalla.innerHTML = resultadoFinal

    resultadoBatalla.appendChild(parrafo)

    buttonFire.disabled = true
    
    buttonWater.disabled = true

    buttonEarth.disabled = true

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function creacionPersonaje(){

}

window.addEventListener('load', iniciarJuego)