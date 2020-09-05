import { init, Sprite, initKeys, keyPressed, GameLoop, getContext } from 'kontra';
import EnergyBar, {LifeBar} from './Bars.js'

let { canvas } = init();

initKeys();

const CENTER = 400

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  NEW_LEVEL: 4
}

const LOGIC_GATE = {
  AND: 0,
  OR: 1
}

let ctx = getContext("2d")

let left_arrow_button = document.getElementById('left-arrow')
let right_arrow_button = document.getElementById('right-arrow')

var arrow_keys = [ left_arrow_button, right_arrow_button ]


let energy_bar = new EnergyBar(document.querySelector('.energy-bar'), 100)
let life_bar = new LifeBar(document.querySelector('.life-bar'), 100) 

let and = new logicGate(-350, 0, 0, "rgba(0, 0, 255, .3)", "rgba(0, 255, 0, .3)", LOGIC_GATE.AND)
let or = new logicGate(-350, 0, toRad(90), "rgba(0, 255, 0, .3)", "rgba(0, 0, 255, .3)", LOGIC_GATE.OR)
var gameObjects = [ and, or, energy_bar, life_bar ]

var logic_gates = [ and, or ]



/****** FUNCTIONS *///////////
function toRad(angle) {
  return angle * Math.PI / 180
}

new addInputButtonToContainer("A", "rgba(0, 0, 255, .3)", false)
new addInputButtonToContainer("S", "rgba(0, 255, 0, .3)", false)
new addInputButtonToContainer("D", "rgba(0, 255, 0, .3)", false)
new addInputButtonToContainer("F", "rgba(0, 255, 0, .3)", false)
/* new addInputButtonToContainer()
new addInputButtonToContainer()
new addInputButtonToContainer()
new adddInputButtonToContainer()
new addInputButtonToContainer() */

/* addRotateButtonToContainer() */

function addInputButtonToContainer (idInput, color, isOn=false) {
  const container = document.querySelector('.InputButtonContainer')
  const button = document.createElement('button')


  button.style.backgroundColor = color
  button.style.width = "80px"
  button.style.height = "80px"
  button.style.borderRadius = "50%"
  button.style.margin = "5px"
  button.style.border = "solid 7px"
  button.style.borderColor = "black"
  button.innerText = idInput
  button.style.fontSize = "40px"
  container.appendChild(button)

  this.isOn = isOn
  this.changeColor = function(){

  }
}

function turnOnColor(color) {
  let turnedOnColor = color.split('')
  turnedOnColor.pop()
  turnedOnColor.pop()
  turnedOnColor.pop()
  turnedOnColor.push("1)")

  return turnedOnColor.join('')
}

function turnOffColor(color) {
  let turnedOnColor = color.split('')
  turnedOnColor.pop()
  turnedOnColor.pop()
  turnedOnColor.pop()
  turnedOnColor.push(" .3)")

  return turnedOnColor.join('')
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



let a_input = false
let s_input = false

let count = 0

function keyDown(evt) {
  if(evt.keyCode == 65){
    if(a_input === false){
      and.colorSup = "rgba(0, 0, 255, 1)"
      or.colorInf = "rgba(0, 0, 255, 1)"
      a_input = true
    } else {
      and.colorSup = "rgba(0, 0, 255, .3)"
      or.colorInf = "rgba(0, 0, 255, .3)"
      a_input = false
    }
  }

  if(evt.keyCode == 83){
    if(s_input === false){
      and.colorInf = "rgba(0, 255, 0, 1)"
      or.colorSup = "rgba(0, 255, 0, 1)"
      s_input = true
    } else {
      and.colorInf = "rgba(0, 255, 0, .3)"
      or.colorSup = "rgba(0, 255, 0, .3)"
      s_input = false
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


    if( a_input === true && s_input === true){
      logic_gates.forEach((object) => {
        if(object.type === 0) {   //And
          count += 3 / 60
        } else if(object.type === 1){   //Or
          count += 1 / 60
        }
      })
      
      
    } else if (a_input === true || s_input === true) {
      logic_gates.forEach((object) => {
        if(object.type === 1){   //Or
          count += 1 / 60
        }
      })  
    } else {
      count -= 1 / 60 / 2
    }

    energy_bar.setValue(energy_bar.value - count)
    count = 0

    document.addEventListener('keydown', keyDown)

    right_arrow_button.onmousedown = function () {
      and.angle += toRad(1)
      or.angle += toRad(1)
    }
    
    left_arrow_button.onmousedown = function () {
      and.angle -= toRad(1)
      or.angle -= toRad(1)
    }
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