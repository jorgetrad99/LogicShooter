import { init, Sprite, initPointer, load, Button, initKeys, keyPressed, GameLoop, getContext, degToRad } from 'kontra';
import EnergyBar, {LifeBar} from './bars.js'
import LogicGate from './logicGate'

init();
let ctx = getContext("2d")
initKeys()
initPointer()

const CENTER = 400

const GAME_STATE = {
  NOTFOUND: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  NEW_LEVEL: 4,
  INSTRUCTIONS: 5
}

const LOGIC_GATE = {
  AND: 0,
  OR: 1
}

const ENEMIES = {
  GENERATOR: 0,
  BUG: 1
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

let left_arrow_button = {
  id: document.getElementById('left-arrow'),
  flag: false
}

let right_arrow_button = {
  id: document.getElementById('right-arrow'),
  flag: false
}

let energy_bar = new EnergyBar(document.querySelector('.energy-bar'), 100)
let life_bar = new LifeBar(document.querySelector('.life-bar'), 100) 

let generator = new Generator()

let and = new LogicGate(-350, 0, 0, "rgba(0, 0, 255, .3)", "rgba(0, 255, 0, .3)", LOGIC_GATE.AND, ctx)
let or = new LogicGate(-350, 0, degToRad(90), "rgba(0, 255, 0, .3)", "rgba(0, 0, 255, .3)", LOGIC_GATE.OR, ctx)

let a_in_but = new addInputButtonToContainer("A", "rgba(0, 0, 255, .3)", false, true)
let s_in_but = new addInputButtonToContainer("S", "rgba(0, 255, 0, .3)", false, true)
let d_in_but = new addInputButtonToContainer("D", "rgba(0, 255, 0, .3)", false, false)
let f_in_but = new addInputButtonToContainer("F", "rgba(0, 255, 0, .3)", false, false)

let inputs = [a_in_but, s_in_but, d_in_but, f_in_but ]

inputs.forEach((object) => object.changeActive())


var gameObjects = [ and, or, generator, energy_bar, life_bar ]
var arrow_keys = [ left_arrow_button, right_arrow_button ]
var logic_gates = [ and, or ]

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

function opacityGame() {
  top.style.opacity = "0.5"
  gameScreen.style.opacity = "0.5"
  bottom.style.opacity = "0.5"
}

function UnOpacityGame() {
  top.style.opacity = "1"
  gameScreen.style.opacity = "1"
  bottom.style.opacity = "1"
}

function dialog(message) {
  const FONT = 30
  let break_lines = message.split('\n')
  var i=0
  ctx.beginPath()
  ctx.rect(CENTER / 2, CENTER / 2, CENTER, FONT * (break_lines.length))
  ctx.fillStyle = "rgba(0, 0, 0, .4)"
  ctx.fill()
  ctx.beginPath()
  ctx.textBaseline = 'top'
  
  ctx.font = FONT + "px sans-serif"
  ctx.fillStyle = "rgba(255, 255, 255, 1)"
  
  for( i = 0; i < break_lines.length; i++){
    ctx.fillText(break_lines[i], CENTER / 2, CENTER / 2 + FONT * i) 
  }  
  ctx.closePath()
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

function circulito() {
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

/****** Enemies ******/
function Generator(){
  
  this.life = 100
  this.r = 40
  
  this.angle = 0

  this.position = {
    x: CENTER,
    y: CENTER
  }
  this.speed = {
    x: 1,
    y: -2
  }
  this.visible = true

  this.update = function() {
    this.angle += 1/60
    this.position.x += this.speed.x
    this.position.y += this.speed.y

    ctx.lineWidth = 2

    ctx.save();

    ctx.translate(this.position.x, this.position.y)

    ctx.beginPath()
    ctx.rotate(this.angle + 45); 
    ctx.rect(- this.r / 2, - this.r / 2, this.r, this. r)
    ctx.fillStyle = "#899"
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
    
    ctx.restore()

    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    
    ctx.fillStyle = "rgb(250, 245, 80)"
    ctx.strokeStyle = "#000"
    ctx.rotate(this.angle); 
    ctx.beginPath()
    ctx.rect(- this.r / 2, - this.r / 2, this.r, this. r)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    ctx.restore()

    let dist = Math.sqrt(Math.pow(CENTER - this.position.x, 2) + Math.pow(CENTER - this.position.y, 2))
    
    if(dist >= 200 - Math.sqrt(Math.pow(this.r / 2, 2) * 2) ){
      if(this.position.x > CENTER && this.position.y < CENTER){
        this.speed.x = randomSpeed()
        this.speed.y = -randomSpeed()
      }else if(this.position.x < CENTER && this.position.y < CENTER){
        this.speed.x = -randomSpeed()
        this.speed.y = -randomSpeed()
      }else if(this.position.x < CENTER && this.position.y > CENTER){
        this.speed.x = -randomSpeed()
        this.speed.y = randomSpeed()
      }else if(this.position.x > CENTER && this.position.y > CENTER){
        this.speed.x = randomSpeed()
        this.speed.y = randomSpeed()
      }
    }
  }
}

function randomSpeed() {
  return Math.random() * (5 - 3) - 3
}


function shootLaser(logic_gate){  
  logic_gate.lasers.push({
    
    position: {
      x: logic_gate.x,
      y: logic_gate.y
    },  
    speed: {
      x: Math.cos(logic_gate.angle) * 3 / 60,
      y: Math.sin(logic_gate.angle) * 3 / 60
    },
    a: logic_gate.a,
    type: logic_gate.type
  })
}

function drawLasers(logic_gate) {
  for(var i = 0; i < logic_gate.lasers.length; i++){
    ctx.fillStyle = "red"


    if(logic_gate.type === LOGIC_GATE.AND){
      for(var i=0; i<logic_gate.lasers.length; i++){
        if(logic_gate.lasers[i].type === LOGIC_GATE.AND)
        ctx.save();
        ctx.translate(CENTER, CENTER);
        ctx.rotate(logic_gate.angle);
        
        
        ctx.beginPath()
        ctx.rect(logic_gate.lasers[i].position.x + logic_gate.r * 4 / 2, logic_gate.lasers[i].position.y - logic_gate.r / 7, 300, 10)
        ctx.fill()
        ctx.restore()
        
      }
    }
    
    if(logic_gate.type === LOGIC_GATE.OR){
      ctx.fillStyle = "blue"
      ctx.save();
      ctx.translate(CENTER, CENTER);
      ctx.rotate(logic_gate.lasers.a + degToRad(45));

      ctx.beginPath()
      ctx.rect(logic_gate.lasers[i].position.x + logic_gate.r * 5 / 2, logic_gate.lasers[i].position.y - logic_gate.r / 7, 30, 10)
      ctx.fill()
      ctx.restore()
    }
    
  }
}



/******* CHECK EVENTS **********/
let a_input = false
let s_input = false

let count = 0

function keyDown(evt) {
  if(evt.keyCode == 65){
    if(a_input === false){
      and.colorSup = "rgba(0, 0, 255, 1)"
      or.colorInf = "rgba(0, 0, 255, 1)"
      
      /* a_in_but = true */
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

function checkLaser(){
  //&& (evt.keyCode ===65 || evt.keyCode === 83)
  if(a_input && s_input && generator.visible ){
    shootLaser(and)
    shootLaser(or)
  }else if(a_input || s_input && generator.visible ){ //&& (evt.keyCode ===65 || evt.keyCode === 83)
      shootLaser(or)
      
      for(var i=0; i<and.lasers.length; i++){
        if( and.lasers.length >0){
          and.lasers.splice(i, 1)
        }
      }
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
}

function checkButtonFlag() {
  if(right_arrow_button.flag === true){
    and.angle += degToRad(1)
    or.angle += degToRad(1)
  }
  if(left_arrow_button.flag === true){
    and.angle -= degToRad(1)
    or.angle -= degToRad(1)
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

function checkButtonTouched() {
  right_arrow_button.id.ontouchstart = function () {
    right_arrow_button.flag = true
  }
  right_arrow_button.id.ontouchend = function () {
    right_arrow_button.flag = false
  }
  
  left_arrow_button.id.ontouchstart = function () {
    left_arrow_button.flag = true
  }  
  left_arrow_button.id.ontouchend = function () {
    left_arrow_button.flag = false
  }
}

function checkEvent() {
  if(state_inst <= 4) {

    gameScreen.ontouchstart = function(e){    //Touch to start
      state_inst ++
    }
    gameScreen.onmousedown = function(e){    //Click to start
      state_inst ++
    }
    document.onkeypress=function(e){    //press any key to start
      state_inst ++
    }
  }
}

function checkKeyPressed() {
  if(keyPressed('right')){
     and.angle += degToRadoRad(1)
    or.angle += degToRad(1) 
  }
  if(keyPressed('left')){
    and.angle -= degToRad(1)
    or.angle -= degToRad(1) 
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

let start_game = document.getElementById('start-game')
let asking = document.getElementById('asking')
asking.style.display = "none"
start_game.style.display = "none"

let state_inst = 0
hideElements()

let state = GAME_STATE.NOTFOUND

//Game Loop//
let loop = GameLoop({  // create the main game loop
    
  update: function() { // update the game state
    switch(state) {
      case GAME_STATE.NOTFOUND:
        hideElements()
        setTimeout(() => {
          asking.style.display = "block"
          setTimeout(() => {
            start_game.style.display = "block"

            document.onkeypress=function(e){    //press any key to start
              state = GAME_STATE.INSTRUCTIONS
            }
            document.onmousedown=function(e){    //click to start
              state = GAME_STATE.INSTRUCTIONS
            }
            document.touchstart = function(e){    //Touch to start
              state = GAME_STATE.INSTRUCTIONS
            }
          }
            ,2000)
        }
          ,2000)
        break
      case  GAME_STATE.INSTRUCTIONS:
        hideNotFound()
        showElements()
        opacityGame()
        
        checkEvent()  
        break 

        case  GAME_STATE.INSTRUCTIONS:
          if(state_inst < 4) {
            hideNotFound()
            showElements()
            opacityGame()
            checkEvent()
          }
          break  

        case GAME_STATE.RUNNING:
          hideNotFound()
          showElements()

          gameObjects.forEach((object) => object.update())
          
          energy_bar.setValue(energy_bar.value - count)
          count = 0

          checkButtonTouched()
          checkButtonPressed()

          checkKeyPressed()
          checkButtonFlag()
          document.addEventListener('keydown', keyDown)
          checkLaser()
          
    }
  },
  render: function() { // render the game state
    
    circulito()
    circulote()
    
    switch(state) {
      case  GAME_STATE.INSTRUCTIONS:
      
        switch (state_inst) {
          case 0:
            dialog("We've found the error, you'll\nhave to destroy the generator\nand the enemies that came \nfrom it ")
            break
          case 1:
            dialog("The only way to defeat them \nis by supplying energy to the \nlogic gates inputs. This can \nbe done by pressing the \nbuttons in the bottom left and \nif you wanna change the \nposition of the logic gates, \nyou can rotate them by \npressing the buttons in the \nbottom right.\n\nYou can also press the a, s, d, \nf, left arrow and right arrow \nkeys to do the same actions")
            bottom.style.opacity = "1"
            break
          case 2:
            dialog("The one on the left is an \nAnd Logic Gate. The TWO \ninputs of it must be supplied \nby energy in order to shoot \nenemies.\n\nThe one on the top is an Or \nLogic Gate. Just ONE of its \ninputs needs to be supplied \nby energy in order to shoot \nenemies")  
            gameScreen.style.opacity = "1"
            break
          case 3:
            dialog("Lastly just keep in mind that \nenergy decreases per each \ninput that is activated. Good \nluck c:")
            top.style.opacity = "1"
            break
          default:
            state = GAME_STATE.RUNNING
            UnOpacityGame()
        }
          break

        case GAME_STATE.RUNNING:
          
          break
    }      

    gameObjects.forEach((object) => object.update())
    drawLasers(and)
  },
  fps: 60
});

// start the game//
loop.start();    
