const selectionAttack = document.getElementById('seleccionar_ataque')
const sectionReiniciar = document.getElementById('reiniciar')
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
const contentTarjetas=document.getElementById('contenedor_tarjetas')
const buttonsAttack=document.getElementById('botones_ataques')

let buttonFire
let buttonWater 
let buttonEarth
let botones= []
let ataqueJugador=[]
let ataqueEnemigo=[]
let attackEnnemycontrol=[true,true,true,true,true]
let numeroAtaques=0

let optionMokepones
let mokepones=[]

let attackPlayer
let attackEnnemy

let petPlayer
let petEnemy
let buttonsAttackFuction = []
let victoriasJugador = 0
let victoriasEnemigo = 0

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
    {nombre: 'AGUA 💧',id:'buttonWater'},
    {nombre: 'AGUA 💧',id:'buttonWater'},
    {nombre: 'AGUA 💧',id:'buttonWater'},
    {nombre: 'AGUA 💧',id:'buttonWater'},
    {nombre: 'TIERRA 🪴',id:'buttonEarth'}
)

dracarie.ataques.push(
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'AGUA 💧',id:'buttonWater'},
    {nombre: 'TIERRA 🪴',id:'buttonbuttonEarth'}
)

bearags.ataques.push(
    {nombre: 'TIERRA 🪴',id:'buttonbuttonEarth'},
    {nombre: 'TIERRA 🪴',id:'buttonbuttonEarth'},
    {nombre: 'TIERRA 🪴',id:'buttonbuttonEarth'},
    {nombre: 'AGUA 💧',id:'buttonWater'},
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
)

fexfire.ataques.push(
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'TIERRA 🪴',id:'buttonbuttonEarth'},
    {nombre: 'AGUA 💧',id:'buttonWater'},
)

cerberus.ataques.push(
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'TIERRA 🪴',id:'buttonbuttonEarth'},
    {nombre: 'TIERRA 🪴',id:'buttonbuttonEarth'},
    {nombre: 'AGUA 💧',id:'buttonWater'},
)

lionfire.ataques.push(
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'FUEGO 🔥',id:'buttonFire'},
    {nombre: 'TIERRA 🪴',id:'buttonEarth'},
    {nombre: 'TIERRA 🪴',id:'buttonWater'},
)

mokepones.push(wolfice,dracarie,bearags,fexfire,cerberus,lionfire) 

function iniciarJuego() {
    selectionAttack.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    
    mokepones.forEach((mokepon)=>{
        optionMokepones=`
        <input type="radio" name="mascota" id="${mokepon.nombre}">
            <label class="tarjeta-mokepon" for="${mokepon.nombre}">
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}" alt="${mokepon.nombre}"> 
            </label>
        `
        contentTarjetas.innerHTML+=optionMokepones
    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', ()=> location.reload())
}

function seleccionarMascotaJugador() {
    let lengthPets=inputPetPlayer.length
      for (let index = 0; index < lengthPets; index++) {
        let input = document.getElementById(inputPetPlayer[index].id);
        if (input.checked) {
            petPlayer=mokepones[index]     
            spanMascotaJugador.innerHTML = petPlayer.nombre
            selectionAttack.style.display = 'flex'
            selectionPet.style.display = 'none'
            crearBotonesAtaque()
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
    attackEnnemy=mokepones[petRamdom].ataques
    secuenciaAtaque()
}

function crearBotonesAtaque(){
    petPlayer.ataques.forEach((attack)=>{
        attackPlayer=`
        <button id="${attack.id}" class="boton_ataque BAtaque">${attack.nombre}</button>
        `
        buttonsAttack.innerHTML += attackPlayer  
    })
    botones=document.querySelectorAll('.BAtaque')
    console.log(botones)
}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e)=>{
            if(e.target.textContent==='FUEGO 🔥'){
                ataqueJugador.push('FUEGO 🔥')
            }else if(e.target.textContent==='TIERRA 🪴'){
                ataqueJugador.push('TIERRA 🪴')
            }else{
                ataqueJugador.push('AGUA 💧')
            }
            console.log(ataqueJugador)
            boton.style.background = '#112f58'
            ataqueAleatorioEnemigo()
            boton.disabled=true
        })
        
    })
    
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,attackEnnemy.length-1)
    
    if (attackEnnemycontrol[ataqueAleatorio]) {
        ataqueEnemigo.push(attackEnnemy[ataqueAleatorio].nombre)
        attackEnnemycontrol[ataqueAleatorio]=false
        combate()        
        console.log(ataqueEnemigo)
    } else{
        ataqueAleatorioEnemigo()
    }       
}

function combate() {
    let mensaje="GANASTE"
    if(ataqueEnemigo[numeroAtaques] == ataqueJugador[numeroAtaques]) {
        mensaje="EMPATE"
    } else if(ataqueJugador[numeroAtaques] == 'FUEGO 🔥' && ataqueEnemigo[numeroAtaques] == 'TIERRA 🪴') {
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    } else if(ataqueJugador[numeroAtaques] == 'AGUA 💧' && ataqueEnemigo[numeroAtaques] == 'FUEGO 🔥') {
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    } else if(ataqueJugador[numeroAtaques] == 'TIERRA 🪴' && ataqueEnemigo[numeroAtaques] == 'AGUA 💧') {
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    } else {
        mensaje="PERDISTE"
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
    crearMensaje(mensaje)
    revisarVidas()
    numeroAtaques++
}

function revisarVidas() {
     if(numeroAtaques==4){
        if(victoriasJugador==victoriasEnemigo){
            crearMensajeFinal("EMPATE 😲")
        }else if(victoriasJugador>victoriasEnemigo){
            crearMensajeFinal("FELICITACIONES! Ganaste 🙂")
        }else
            crearMensajeFinal('Lo siento, perdiste 😔')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
   
    resultadoBatalla.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML= ataqueJugador[numeroAtaques]
    nuevoAtaqueEnemigo.innerHTML= ataqueEnemigo[numeroAtaques]
    
    mensajeAtaqueJugador.appendChild(nuevoAtaqueJugador)
    mensajeAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {    
    let parrafo = document.createElement('p')
    resultadoBatalla.innerHTML = resultadoFinal

    resultadoBatalla.appendChild(parrafo)
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