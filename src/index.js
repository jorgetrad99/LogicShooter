import { init, Sprite, GameLoop, getContext } from 'kontra';
import LogicGate, { Enemies } from "./drawings.js"
import EnergyBar, {LifeBar} from './Bars.js'

let { canvas } = init();

let ctx = getContext('2d');

const CENTER = 400

let and = new LogicGate({
    x: 250,
    y: 0
}, 0)

/* let or = new LogicGate({
    x: 150,
    y: 0
}, 1) */

let bar = new EnergyBar(document.querySelector('.energy-bar'), 100)
let bar2 = new LifeBar(document.querySelector('.life-bar'), 85) 

var gameObjects = [ and ]

/****** FUNCTIONS *///////////
function circuito() {
  //Circulito
  ctx.beginPath()
  /* this.ctx.arc() */
  ctx.arc(CENTER, CENTER, 3, 0, Math.PI * 2, true)
  ctx.fillStyle = "white"
  ctx.closePath()
  ctx.fill()
}



//Game Loop//
let loop = GameLoop({  // create the main game loop
    
  update: function() { // update the game state
    /* sprite.update(); */
    
    bar.update()
    bar2.update()
    /* and.rot() */
    /* console.log(and.angle) */

    gameObjects.forEach((object) => object.update())
    // wrap the sprites position when it reaches
    // the edge of the screen
    /* if (sprite.x > canvas.width) {
      sprite.x = -sprite.width;
    } */
  },
  render: function() { // render the game state
    /* or.render() */
    /* sprite.render(); */

   

    gameObjects.forEach((object) => object.render())
    circuito()
  },
  fps: 1
});



// start the game//
loop.start();    