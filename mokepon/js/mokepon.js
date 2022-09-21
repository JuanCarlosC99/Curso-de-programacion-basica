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
const verMapa=document.getElementById('ver_mapa')
const mapa=document.getElementById('mapa')
let mapaBackground=new Image()
mapaBackground.src='./assets/mokemap.png'

let buttonFire
let buttonWater 
let buttonEarth
let botones= []
let ataqueJugador=[]
let ataqueEnemigo=[]
let attackEnnemycontrol=[0,1,2,3,4]
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
let lienzo = mapa.getContext('2d')
let intervalo

class Mokepon{
    constructor(nombre,foto,vida,x=20,y=30){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques=[]
        this.x=x
        this.y=y
        this.ancho=50
        this.alto=50
        this.mapaFoto=new Image()
        this.mapaFoto.src=foto
        this.velocidadX=0
        this.velocidadY=0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let wolfice = new Mokepon('Wolfice','assets/wolfice.png',5,   0,38)
let dracarie =new Mokepon('Dracarie','assets/dracarie.webp',5, 90,0)
let bearags = new Mokepon('Bearags','assets/bearags.webp',5,   240,20)
let fexfire = new Mokepon('Fexfire','assets/fexfire.png',5,    40,120)
let cerberus = new Mokepon('Cerberus','assets/cerberus.png',5, 240,120)
let lionfire = new Mokepon('Lionfire','assets/lionfire.webp',5,290,190)

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
    verMapa.style.display='none'
    
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
            mokepones.splice(index,1)
            spanMascotaJugador.innerHTML = petPlayer.nombre
            //selectionAttack.style.display = 'flex'
            //seleccionarMascotaEnemigo()
            verMapa.style.display='flex'   
            pintarCanvas()         
            selectionPet.style.display = 'none'
            crearBotonesAtaque()
            iniciarMapa()
            break
        }else{
            if(index==(lengthPets-1)){
                alert('Selecciona una mascota')
        }}
      }
}

function seleccionarMascotaEnemigo(mokepon) {
    petEnemy = mokepon          
    spanMascotaEnemigo.innerHTML = petEnemy.nombre
    attackEnnemy=petEnemy.ataques
    console.log(petEnemy.ataques)
    console.log(attackEnnemy)
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
            console.log('que')
            boton.disabled=true
        })
        
    })
    
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,attackEnnemy.length-1)
        console.log('arreglos');     
        console.log(ataqueAleatorio)
        console.log(attackEnnemy)
        ataqueEnemigo.push(attackEnnemy[ataqueAleatorio].nombre)
        combate()   
        if(ataqueAleatorio===0){
            console.log(attackEnnemy.shift())
        }else{
            console.log(attackEnnemy.splice(ataqueAleatorio,1))
        }
        console.log(ataqueEnemigo)     
        console.log('arreglos fin');     
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

function pintarCanvas(){
    petPlayer.x=petPlayer.x+petPlayer.velocidadX
    petPlayer.y=petPlayer.y+petPlayer.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    if(petPlayer.velocidadX !== 0 || petPlayer.velocidadY !== 0){
       
        mokepones.forEach((mokepon) => { revisarColision(mokepon);})
    }
    petPlayer.pintarMokepon()

    mokepones.forEach((mokepon) => {mokepon.pintarMokepon()})
    
    
   
}

function moverPetUp(){
    petPlayer.velocidadY=-5
   
}

function moverPetRight(){
    petPlayer.velocidadX= +5
    
}

function moverPetLeft(){
    petPlayer.velocidadX=-5
    
}

function moverPetDown(){
    petPlayer.velocidadY=+5
}

function detenerMovimiento(){
    petPlayer.velocidadX=0
    petPlayer.velocidadY=0
}
function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverPetUp()
            break
        case 'ArrowDown':
            moverPetDown()
            break
        case 'ArrowLeft':
            moverPetLeft()
            break
        case 'ArrowRight':
            moverPetRight()
            break
        default:
            break
    }
}
function iniciarMapa(){
    mapa.width=300
    mapa.height=200
    intervalo=setInterval(pintarCanvas,50)
            window.addEventListener('keydown',sePresionoUnaTecla)
            window.addEventListener('keyup',detenerMovimiento)
}

function revisarColision(enemigo){
    const arribaEnemigo= enemigo.y
    const abajoEnemigo= enemigo.y+enemigo.alto
    const derechaEnemigo= enemigo.x+enemigo.ancho
    const izquierdaEnemigo=enemigo.x
  
    const arribaMascota= petPlayer.y
    const abajoMascota= petPlayer.y+petPlayer.alto
    const derechaMascota= petPlayer.x+petPlayer.ancho
    const izquierdaMascota=petPlayer.x
    //alert('hola')
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo 
        ){
            return 
        }
        clearInterval(intervalo)
        console.log('se detecto colision');
        detenerMovimiento()
        seleccionarMascotaEnemigo(enemigo)
        selectionAttack.style.display = 'flex'
        verMapa.style.display ='none'
        

}

window.addEventListener('load', iniciarJuego)