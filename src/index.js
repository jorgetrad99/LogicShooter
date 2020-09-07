import { init, Sprite, initKeys, keyPressed, GameLoop, getContext } from 'kontra';
import EnergyBar, {LifeBar} from './Bars.js'

let { canvas } = init();
let ctx = getContext("2d")
initKeys();

const CENTER = 400

const GAME_STATE = {
  NOTFOUND: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  NEW_LEVEL: 4
}

const LOGIC_GATE = {
  AND: 0,
  OR: 1
}

let notFound = document.getElementById("not-found")
let top = document.querySelector(".top")
let gameScreen = document.getElementById("gameScreen")
let bottom = document.querySelector(".bottom")

if(screen.width <= 280){
  document.write("<style>body{zoom:35%}</style>")
}else if(screen.width > 320 && screen.width <= 375){
  document.write("<style>body{zoom:45%}</style>")
}else if(screen.width > 375 && screen.width <= 414){
  document.write("<style>body{zoom:50%}</style>")
}else if(screen.width > 280 && screen.width <= 320){
  document.write("<style>body{zoom:40%}</style>")
}else if(screen.width >= 500 && screen.width < 700){
  document.write("<style>body{zoom:65%}</style>")
}else if(screen.width >= 750 && screen.width < 1000){
  document.write("<style>body{zoom:92%}</style>")
}else if(screen.width >= 1000){
  document.write("<style>body{zoom:80%}</style>")
}          

/* 
let remaining_height = document.querySelector('.bottom')

remaining_height.height = window.height - 860 */


let left_arrow_button = {
  id: document.getElementById('left-arrow'),
  flag: false
}

let right_arrow_button = {
  id: document.getElementById('right-arrow'),
  flag: false
}  

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

let a_in_but = new addInputButtonToContainer("A", "rgba(0, 0, 255, .3)", false, true)
let s_in_but = new addInputButtonToContainer("S", "rgba(0, 255, 0, .3)", false, true)
let d_in_but = new addInputButtonToContainer("D", "rgba(0, 255, 0, .3)", false, false)
let f_in_but = new addInputButtonToContainer("F", "rgba(0, 255, 0, .3)", false, false)

let inputs = [a_in_but, s_in_but, d_in_but, f_in_but ]




inputs.forEach((object) => object.changeActive())


/* new addInputButtonToContainer()
new addInputButtonToContainer()
new addInputButtonToContainer()
new adddInputButtonToContainer()
new addInputButtonToContainer() */

/* addRotateButtonToContainer() */

function addInputButtonToContainer (idInput, color, isOn=false, active = true) {
  const container = document.querySelector('.InputButtonContainer')
  this.button = document.createElement('button')

  this.color = color
  this.active = active

  this.button.style.backgroundColor = "rgba(92, 92, 92, 1)"
  this.button.style.width = "80px"
  this.button.style.height = "80px"
  this.button.style.borderRadius = "50%"
  this.button.style.outline = "none"
  this.button.style.margin = "5px"
  this.button.style.border = "solid 7px"
  this.button.style.borderColor = "black"
  this.button.innerText = idInput
  this.button.id = idInput.toLowerCase()
  this.button.style.fontSize = "40px"
  this.button.style.backgroundColor = this.color
  container.appendChild(this.button)

  this.id = document.getElementById(this.button.id)

  this.isOn = isOn
  this.changeActive = function() {
    if(this.active){
      this.button.style.display = "block"
    }else{
      this.button.style.display = "none"
    }
  }
}

addInputButtonToContainer.prototype.changeColor = function(){
  console.log(this.color)
  console.log(this.color.length);

  switch(this.color.length){
    case 19:
      this.button.style.backgroundColor = turnOnColor(this.color)
      this.color = turnOnColor(this.color)
      break
    case 18:
      this.button.style.backgroundColor = turnOffColor(this.color)
      this.color = turnOffColor(this.color)
      break
  }
}

function hideElements() {
  top.style.display = "none"
  gameScreen.style.display = "none"
  bottom.style.display = "none"
}

function showElements() {
  top.style.display = "flex"
  gameScreen.style.display = "block"
  bottom.style.display = "flex"
}

function hideNotFound(){
  notFound.style.display = "none"
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
    a_in_but.changeColor()
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
    s_in_but.changeColor()
  }
}

function checkButtonPressed(){
  right_arrow_button.id.onmousedown = function () {
    right_arrow_button.flag = true
  }
  right_arrow_button.id.onmouseup = function () {
    right_arrow_button.flag = false
  }
  
  left_arrow_button.id.onmousedown = function () {
    left_arrow_button.flag = true
  }  
  left_arrow_button.id.onmouseup = function () {
    left_arrow_button.flag = false
  }  

  if(right_arrow_button.flag === true){
    and.angle += toRad(1)
    or.angle += toRad(1)
  }
  if(left_arrow_button.flag === true){
    and.angle -= toRad(1)
    or.angle -= toRad(1)
  }

  a_in_but.id.onmousedown = function() {
    if(a_input === false){
      and.colorSup = "rgba(0, 0, 255, 1)"
      or.colorInf = "rgba(0, 0, 255, 1)"
      
      a_input = true
    } else {
      and.colorSup = "rgba(0, 0, 255, .3)"
      or.colorInf = "rgba(0, 0, 255, .3)"
      a_input = false
    }
    a_in_but.changeColor()
  }

  s_in_but.id.onmousedown = function(){
    if(s_input === false){
      and.colorInf = "rgba(0, 255, 0, 1)"
      or.colorSup = "rgba(0, 255, 0, 1)"
      s_input = true
    } else {
      and.colorInf = "rgba(0, 255, 0, .3)"
      or.colorSup = "rgba(0, 255, 0, .3)"
      s_input = false
    }
    s_in_but.changeColor()
  }
}

function checkKeyPressed() {
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
}


let state = GAME_STATE.NOTFOUND
hideElements()
let solve_problem = document.getElementById('solve-problem')
solve_problem.style.display = "none"

//Game Loop//
let loop = GameLoop({  // create the main game loop
    
  update: function() { // update the game state
    
    switch(state) {
      case GAME_STATE.NOTFOUND:
        setTimeout(() => {
          solve_problem.style.display = "block"
          /* state = GAME_STATE.RUNNING */
        }
          ,2000)
        document.onkeypress=function(e){    //press any key to start
          state = GAME_STATE.RUNNING
        }
        document.onmousedown=function(e){    //press any key to start
          state = GAME_STATE.RUNNING
        }    
        
        break

      case GAME_STATE.RUNNING:
        hideNotFound()
        showElements()
        gameObjects.forEach((object) => object.update())
        
        energy_bar.setValue(energy_bar.value - count)
        count = 0

        document.addEventListener('keydown', keyDown)

        checkButtonPressed()        

        checkKeyPressed()

        
    }
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
