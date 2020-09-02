import { init, Sprite, initKeys, keyPressed, GameLoop, getContext } from 'kontra';
import EnergyBar, {LifeBar} from './Bars.js'

let { canvas } = init();

initKeys();

const CENTER = 400

let ctx = getContext("2d")

let bar = new EnergyBar(document.querySelector('.energy-bar'), 100)
let bar2 = new LifeBar(document.querySelector('.life-bar'), 100) 

let and = new logicGate(-350, 0, 0, 0)
let or = new logicGate(-350, 0,  toRad(90), 1)
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
/****** LOGIC GATES ******/
function logicGate(x, y, angle, type){
  this.r = 18
  this.x = x
  this.y = y
  this.angle = angle
  this.type = type

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
      
      ctx.arc(this.x, this.y, this.r, Math.PI / 2, Math.PI * 3 / 2, true)
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
      ctx.stroke()   
      
        
    }
    //Or
    if( this.type === 1) {
      //Trazos
      //curva trasera
      ctx.arc(this.x - this.r * 2 - Math.sin(Math.PI / 4), 
          this.y, this.r / Math.sin(Math.PI / 4), 
          Math.PI / 4, -(Math.PI / 4), true)

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
      
    }
    ctx.restore();    
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
  },
  render: function() { // render the game state

    gameObjects.forEach((object) => object.update())
    circuito()
  },
  fps: 60
});



// start the game//
loop.start();    