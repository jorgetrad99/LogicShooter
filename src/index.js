import EnergyBar, {LifeBar} from './Bars.js'
import Timer from './timer.js';
import { init, initPointer, initKeys, keyPressed, GameLoop, getContext, degToRad } from 'kontra';

import LogicGate from './logicGate'
import Generator from './generator'

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
  INSTRUCTIONS: 5,
  YOUWIN: 6
}

const LOGIC_GATE = {
  AND: 0,
  OR: 1
}

let left_arrow_button = {
  id: document.getElementById('left-arrow'),
  flag: false
}

let right_arrow_button = {
  id: document.getElementById('right-arrow'),
  flag: false
}

let notFound = document.getElementById("not-found")
let top = document.querySelector(".top")
let gameScreen = document.getElementById("gameScreen")
let bottom = document.querySelector(".bottom")

/******* Objects ********/
let timer = new Timer(16)

let energy_bar = new EnergyBar(document.querySelector('.energy-bar'), 100)
let life_bar = new LifeBar(document.querySelector('.life-bar'), 100) 

let generator = new Generator(ctx)

let and = new LogicGate(-350, 0, 0, "rgba(0, 0, 255, .3)", "rgba(0, 255, 0, .3)", LOGIC_GATE.AND, ctx)
let or = new LogicGate(-350, 0, degToRad(180), "rgba(0, 255, 0, .3)", "rgba(0, 0, 255, .3)", LOGIC_GATE.OR, ctx)

let a_in_but = new addInputButtonToContainer("A", "rgba(0, 0, 255, .3)", false, true)
let s_in_but = new addInputButtonToContainer("S", "rgba(0, 255, 0, .3)", false, true)

/****** Array of Objects ******/
var gameObjects = [ and, or, energy_bar, life_bar ]
var arrow_keys = [ left_arrow_button, right_arrow_button ]
var logic_gates = [ and, or ]
let inputs = [a_in_but, s_in_but ]

let a_input = false
let s_input = false

let count = 0

/******* Screen Sections *******/
let start_game = document.getElementById('start-game')
let asking = document.getElementById('asking')
asking.style.display = "none"
start_game.style.display = "none"

let state_inst = 0

let state = GAME_STATE.NOTFOUND

/******* MANAGING RESOLUTION OF THE SCREEN ********/
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

/****** FUNCTIONS *///////////
function restartGame() {
  timer.setValue(1.5)
  energy_bar.setValue(100)
  life_bar.setValue(100)
  generator.position.x = CENTER
  generator.position.y = CENTER
  and.angle = 0
  or.angle = degToRad(90)
  
  if(a_input && s_input ){
    changeColorLogicGateAInput()
    changeColorLogicGateSInput()
  }else if(a_input && !s_input){
    changeColorLogicGateAInput()
  }else if(!a_input && s_input){
    changeColorLogicGateSInput()
  }
  checkLaser()
}

function isCollision(logGate, enemie){
  const r = 300

  var y_position = r * Math.sin(logGate.angle)
  var x_position = y_position / Math.tan(logGate.angle)
  
  let enemieToCenter = distTwoPoints(enemie.position.x, enemie.position.y, CENTER, CENTER)
  let logGateToCenter = distTwoPoints(x_position, y_position, CENTER, CENTER)
  let logGateToEnemie = distTwoPoints(x_position, y_position, enemie.position.x, enemie.position.y)

  var x = enemieToCenter * Math.sin(Math.acos((Math.pow(enemieToCenter, 2) - Math.pow(logGateToEnemie, 2) + Math.pow(logGateToCenter, 2)) / (2 * enemieToCenter * logGateToCenter)))

  if( x <= 5){
    console.log("COLLISION")
    return true
  } else{
    return false
  }
}

function distTwoPoints(x1, y1, x2, y2){
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}


function addInputButtonToContainer (idInput, color, isOn=false) {
  const container = document.querySelector('.InputButtonContainer')
  this.button = document.createElement('button')

  this.color = color

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

function dialog(message, height) {
  const FONT = 30
  let break_lines = message.split('\n')
  var i=0
  ctx.beginPath()
  ctx.rect(CENTER / 2, height, CENTER, FONT * (break_lines.length))
  ctx.fillStyle = "rgba(0, 0, 0, .4)"
  ctx.fill()
  ctx.beginPath()
  ctx.textBaseline = 'top'
  
  ctx.font = FONT + "px sans-serif"
  ctx.fillStyle = "rgba(255, 255, 255, 1)"
  
  for( i = 0; i < break_lines.length; i++){
    ctx.fillText(break_lines[i], CENTER / 2, height + FONT * i) 
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

function showNotFound(){
  notFound.style.display = "block"
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

function bigCirlce() {
  //Circle
  ctx.beginPath()
  ctx.arc(CENTER, CENTER, 300, 0, Math.PI * 2, true)
  ctx.strokeStyle = "white"
  ctx.closePath()
  ctx.stroke()
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
  /* for(var i = 0; i < logic_gate.lasers.length; i++){ */
    ctx.fillStyle = "red"
    switch (logic_gate.type) {
      case LOGIC_GATE.AND:
        for(var i=0; i<logic_gate.lasers.length; i++){
          ctx.save();
          ctx.translate(CENTER, CENTER);
          ctx.rotate(logic_gate.angle);
          
          ctx.beginPath()
          ctx.rect(logic_gate.lasers[i].position.x + logic_gate.r * 4 / 2, logic_gate.lasers[i].position.y - logic_gate.r / 7, 305, 10)
          ctx.fill()
          ctx.restore()          
        }
        break
      
      case LOGIC_GATE.OR:
        ctx.fillStyle = "blue"

        for(var i=0; i<logic_gate.lasers.length; i++){
          /* if(logic_gate.lasers[i].type === LOGIC_GATE.OR){ */
            ctx.save();
            ctx.translate(CENTER, CENTER);
            ctx.rotate(logic_gate.angle);

            ctx.beginPath()
            ctx.rect(logic_gate.lasers[i].position.x + logic_gate.r * 4 / 2, logic_gate.lasers[i].position.y - logic_gate.r / 7, 305, 10)
            ctx.fill()
            ctx.restore()
          //}
        }  
        break 
    }
}

/******* CHECK EVENTS **********/

function changeColorLogicGateSInput(){
  if(s_input === false){
    and.colorInf = "rgba(0, 255, 0, 1)"
    or.colorSup = "rgba(0, 255, 0, 1)"
    s_input = true
    s_in_but.changeColor()
  } else {
    and.colorInf = "rgba(0, 255, 0, .3)"
    or.colorSup = "rgba(0, 255, 0, .3)"
    s_input = false
    s_in_but.changeColor()
  }
}

function changeColorLogicGateAInput(){
  if(a_input === false){
    and.colorSup = "rgba(0, 0, 255, 1)"
    or.colorInf = "rgba(0, 0, 255, 1)"
    
    /* a_in_but = true */
    a_input = true
    a_in_but.changeColor()
    

  } else {
    and.colorSup = "rgba(0, 0, 255, .3)"
    or.colorInf = "rgba(0, 0, 255, .3)"
    a_input = false
    a_in_but.changeColor()
  }
}

function keyDown(evt) {
  if(evt.keyCode == 65){
    changeColorLogicGateAInput()
  }

  if(evt.keyCode == 83){
    changeColorLogicGateSInput()
  }
}

function checkLaser(){
  let count = 0
  
  if(a_input && s_input && generator.visible ){
    if(and.lasers.length < 1){
      shootLaser(and)
    }
    if(or.lasers.length < 1){
      shootLaser(or)
    }
    if(isCollision(and, generator)){
      count +=  50 / 60 
    }
    if(isCollision(or, generator)){
      count += 25 / 60
    }
  }else if((a_input || s_input) && generator.visible ){
    if(or.lasers.length < 1){
      shootLaser(or)
    }
    if( and.lasers.length === 1){
      and.lasers.splice(0, 1)
    }
    if(isCollision(or, generator)){
      count += 25/60
    }
  } else {
      if( and.lasers.length === 1){
        and.lasers.splice(0, 1)
      }
      if( or.lasers.length === 1){
        or.lasers.splice(0, 1)
      }
  }

  life_bar.setValue(life_bar.value - count)
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

function checkButtonArrowsFlag() {
  if(right_arrow_button.flag === true){
    and.angle += degToRad(1)
    or.angle += degToRad(1)
  }
  if(left_arrow_button.flag === true){
    and.angle -= degToRad(1)
    or.angle -= degToRad(1)
  }
}

function checkButtonFlag() {
  a_in_but.id.onmousedown = function() {
    changeColorLogicGateAInput()
  }

  s_in_but.id.onmousedown = function(){
    changeColorLogicGateSInput()
  }
}

function checkButtonFlagTouched(){
  a_in_but.id.ontouch = function() {
    changeColorLogicGateAInput()
  }

  s_in_but.id.ontouch = function(){
    changeColorLogicGateSInput()
  }
  console.log("Entré y lo logré")
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
  if(state_inst < 4 && state === GAME_STATE.INSTRUCTIONS) {
    gameScreen.ontouchstart = function(e){    //Touch to start
      state_inst ++
    }
    gameScreen.onmousedown = function(e){    //Click to start
      state_inst ++
    }
    document.onkeypress=function(e){    //press any key to start
      state_inst ++
    }    
  } else if(state === GAME_STATE.GAME_OVER || state === GAME_STATE.YOUWIN) {
    gameScreen.ontouchstart = function(e){    //Touch to start
      state = GAME_STATE.RUNNING
    }
    gameScreen.onmousedown = function(e){    //Click to start
      state = GAME_STATE.RUNNING
    }
    document.onkeypress=function(e){    //press any key to start
      state = GAME_STATE.RUNNING
    }
  }
}

function checkKeyPressed() {
  if(keyPressed('right')){
     and.angle += degToRad(1)
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


restartGame()

//Game Loop//
let loop = GameLoop({  // create the main game loop
    
  update: function() { // update the game state    
    switch(state) {
      case GAME_STATE.NOTFOUND:
        restartGame()
        hideElements()
        showNotFound()
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

      case GAME_STATE.RUNNING:
        gameObjects.forEach((object) => object.update())

        energy_bar.setValue(energy_bar.value - count)
        count = 0

        
        checkButtonPressed()
        checkButtonTouched()
        checkButtonFlagTouched()

        checkKeyPressed()
        checkButtonFlag()
        checkButtonArrowsFlag()
        document.addEventListener('keydown', keyDown)
        checkLaser()
        timer.update()
        break

      case  GAME_STATE.INSTRUCTIONS:
        
        if(state_inst < 4) {
          opacityGame()
          hideNotFound()
          showElements()
          checkEvent()
        } 
        break  

      case GAME_STATE.GAME_OVER:
        hideNotFound()
        showElements()
        opacityGame()
        setTimeout(() => {
          UnOpacityGame()
          state = GAME_STATE.RUNNING
          restartGame()
          
        },2000)
        break
      
      case GAME_STATE.YOUWIN:
        hideNotFound()
        showElements()
        opacityGame()
        setTimeout(() => {
          UnOpacityGame()
          state = GAME_STATE.RUNNING
          restartGame()
          
        },2000)
        break
    }
    if((timer.time == 0 && life_bar.value > 0) || energy_bar.value === 0) {
      state = GAME_STATE.GAME_OVER
    }
    if((timer.time > 0 && life_bar.value === 0) && energy_bar.value > 0){
      state = GAME_STATE.YOUWIN
    }
    if(state != GAME_STATE.YOUWIN) {
      generator.update()
    }    
  },
  render: function() { // render the game state
    bigCirlce()
    gameObjects.forEach((object) => object.update())
    if(state != GAME_STATE.YOUWIN) {
      generator.update()
    }

    switch(state) {
      case  GAME_STATE.INSTRUCTIONS:
        opacityGame()
        switch (state_inst) {
          case 0:
            dialog("We've found the error, you've\n           got to destroy it!!", CENTER / 2 + 170)
            UnOpacityGame()
            break

          case 1:
            dialog("    The only way to defeat it\n  is by supplying the logic\n  gates inputs with energy.\nThis can be done by pressing\nthe buttons in the bottom left,\n   and if you want to change\n     the position of the logic\n  gates, you can rotate them\n   by pressing the buttons in\n          the bottom right.\n\n You can also press the a, s,\n    left arrow and right arrow\n   keys to perform the same\n                  actions.", CENTER / 2 - 25)
            bottom.style.opacity = "1"
            break

          case 2:
            dialog("     The one on the left is an\n    And Logic Gate. Its TWO\n inputs must be supplied with\n     energy in order to shoot\n               the error.\n\n  The one on the top is an Or \n  Logic Gate. Just ONE of its \n  inputs needs to be supplied \n      with energy in order to \n            shoot the error.", CENTER / 2 + 35)  
            gameScreen.style.opacity = "1"
            break

          case 3:
            dialog(" Lastly, keep in mind that you\n   lose energy every time an\n        input is activated.\n   You also need to mind the\n  timer to avoid running out of\n                    time.\n\n             Good luck!! c:", CENTER / 2 + 80)
            top.style.opacity = "1"
            break

          default:
            UnOpacityGame()
            state = GAME_STATE.RUNNING
            break
        }
        break

      case GAME_STATE.RUNNING:
        drawLasers(and)
        drawLasers(or)
        break
        
      case  GAME_STATE.GAME_OVER:
        dialog("\n             YOU LOSE :(\n", CENTER / 2 + 180)
        break    

      case  GAME_STATE.YOUWIN:
        dialog("\n      CONGATULATIONS!!\n\n                YOU WIN!!\n", CENTER / 2 + 150)
        break
    }
  },
  fps: 60
});

// start the game//
loop.start();    
