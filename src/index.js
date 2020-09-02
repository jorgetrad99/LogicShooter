import { init, Sprite, initKeys, keyPressed, GameLoop, getContext } from 'kontra';
import EnergyBar, {LifeBar} from './Bars.js'

let { canvas } = init();

initKeys();

const CENTER = 400

let ctx = getContext("2d")

let bar = new EnergyBar(document.querySelector('.energy-bar'), 100)
let bar2 = new LifeBar(document.querySelector('.life-bar'), 100) 

let and = new logicGate(-350, 0, 0, "rgba(0, 255, 0, .3)", "rgba(0, 0, 255, .3)", 0)
let or = new logicGate(-350, 0, toRad(90), "rgba(0, 0, 255, .3)", "rgba(0, 255, 0, .3)", 1)
var gameObjects = [ and, or, bar, bar2 ]



/****** FUNCTIONS *///////////
function toRad(angle) {
  return angle * Math.PI / 180
}

function circuito() {
  //Circulito
  ctx.beginPath()
  /* ctx.arc() */
  ctx.arc(CENTER, CENTER, 3, 0, Math.PI * 2, true)
  ctx.fillStyle = "white"
  ctx.closePath()
  ctx.fill()
}

function circulote() {
  //Circulito
  ctx.beginPath()
  /* ctx.arc() */
  ctx.arc(CENTER, CENTER, 300, 0, Math.PI * 2, true)
  ctx.strokeStyle = "white"
  ctx.closePath()
  ctx.stroke()
}

/****** LOGIC GATES ******/
function logicGate(x, y, angle, colorSup, colorInf, type){
  this.r = 20
  if(type === 0){
    this.x = x + 10
  }else {
    this.x = x + 2
  }
  
  this.y = y
  this.angle = angle
  this.type = type
  this.colorSup = colorSup
  this.colorInf = colorInf

  this.update = function(){
    ctx.fillStyle = "#899"
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3
    ctx.save();
    ctx.translate(CENTER, CENTER);
    ctx.rotate(this.angle);

    ctx.beginPath()
        
    //And
    if(this.type === 0) {

      //Semicircle
      
      ctx.arc(this.x, this.y, this.r, toRad(90), toRad(270), true)
      ctx.fill()

      //Rectangle
      ctx.moveTo(this.x, this.y -  this.r)
      ctx.lineTo(this.x - this.r, this.y - this.r)
      ctx.lineTo(this.x - this.r, this.y + this.r)
      ctx.lineTo(this.x, this.y + this.r)
      ctx.fill()
      ctx.stroke()

      //Patitas
      //Patita superior trasera
      ctx.beginPath()
      ctx.moveTo(this.x - this.r, this.y - this.r + this.r / 2)
      ctx.lineTo(this.x - this.r * 2, this.y - this.r + this.r / 2)
      /* ctx.arc(this.x - this.r * 2, this.y - this.r + this.r / 2, this.r/4, 0, 2*Math.PI, true) */
      
      ctx.stroke()
      
      //Patita inferior trasera
      ctx.beginPath()
      ctx.moveTo(this.x - this.r, this.y + this.r / 2)
      ctx.lineTo(this.x - this.r * 2, this.y + this.r / 2)
      ctx.stroke()

      //Patita delantera
      ctx.beginPath()
      ctx.moveTo(this.x + this.r, this.y)
      ctx.lineTo(this.x + this.r * 2, this.y)
      ctx.closePath()
      ctx.stroke()
      
      //Entradas
      //Entrada superior
      ctx.beginPath()
      ctx.arc(this.x - this.r * 2, this.y - this.r + this.r / 2, this.r / 3, 0, toRad(360), true)
      ctx.fillStyle = this.colorSup
      ctx.fill() 

      //Entrada inferior
      ctx.beginPath()
      ctx.arc(this.x - this.r * 2, this.y + this.r / 2, this.r / 3, 0, toRad(360), true)
      ctx.fillStyle = this.colorInf
      ctx.fill() 
    }
    //Or
    if( this.type === 1) {
      //Trazos
      //curva trasera
      ctx.arc(this.x - this.r * 2 - Math.sin(toRad(45)), 
          this.y, this.r / Math.sin(toRad(45)), 
          toRad(45), -toRad(45), true)

      /////////////ESTE ES EL BUENO
      ctx.arcTo(this.x + this.r, this.y - this.r, this.x + this.r * 2, this.y + this.r, this.r*2)
      ctx.arcTo(this.x + this.r , this.y + this.r, this.x - this.r *2, this.y + this.r, this.r*2)
      ctx.closePath()
      
      ctx.fill()
      ctx.stroke()
      
      //Patita delantera
      ctx.beginPath()
      ctx.moveTo(this.x + this.r * 3/2 + 1, this.y + 2)
      ctx.lineTo(this.x + this.r * 5/2, this.y +2)
      ctx.stroke()

      //Patita superior trasera
      ctx.beginPath()
      ctx.moveTo(this.x - this.r + 7, this.y - this.r + this.r / 2)
      ctx.lineTo(this.x - this.r * 2, this.y - this.r + this.r / 2)
      ctx.stroke()
      
      //Patita inferior trasera
      ctx.beginPath()
      ctx.moveTo(this.x - this.r + 7, this.y + this.r / 2)
      ctx.lineTo(this.x - this.r * 2, this.y + this.r / 2)
      ctx.stroke()

      //Entradas
      //Entrada superior
      ctx.beginPath()
      ctx.arc(this.x - this.r * 2, this.y - this.r + this.r / 2, this.r / 3, 0, toRad(360), true)
      ctx.fillStyle = this.colorSup
      ctx.fill() 

      //Entrada inferior
      ctx.beginPath()
      ctx.arc(this.x - this.r * 2, this.y + this.r / 2, this.r / 3, 0, toRad(360), true)
      ctx.fillStyle = this.colorInf
      ctx.fill() 
      
    }
    ctx.restore();    
  }  
}



let band = false
let band2 = false

function keyDown(evt) {
  if(evt.keyCode == 65){
    if(band === false){
      and.colorSup = "rgba(0, 0, 255, 1)"
      or.colorInf = "rgba(0, 0, 255, 1)"
      band = true
    } else {
      and.colorSup = "rgba(0, 0, 255, .3)"
      or.colorInf = "rgba(0, 0, 255, .3)"
      band = false
    }
  }

  if(evt.keyCode == 83){
    if(band2 === false){
      and.colorInf = "rgba(0, 255, 0, 1)"
      or.colorSup = "rgba(0, 255, 0, 1)"
      band2 = true
    } else {
      and.colorInf = "rgba(0, 255, 0, .3)"
      or.colorSup = "rgba(0, 255, 0, .3)"
      band2 = false
    }
  }
}


//Game Loop//
let loop = GameLoop({  // create the main game loop
    
  update: function() { // update the game state
    /* sprite.update(); */
    gameObjects.forEach((object) => object.update())
    if(keyPressed('right')){
      and.angle += toRad(1)
      or.angle += toRad(1)
    }
    if(keyPressed('left')){
      and.angle -= toRad(1)
      or.angle -= toRad(1)
    }

    document.addEventListener('keydown', keyDown)
    /* if(){
      if(band === false){
        and.colorSup = "blue"
        band = true
      } else {
        and.colorSup = "black"
        band = false
        
      }
    } */
  },
  render: function() { // render the game state

    circuito()
    circulote()
    gameObjects.forEach((object) => object.update())
    
  },
  fps: 60
});



// start the game//
loop.start();    