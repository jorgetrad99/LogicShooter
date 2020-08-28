import { init, Sprite, GameLoop, getContext } from 'kontra';
import LogicGate, { Enemies } from "./drawings.js"
import EnergyBar, {LifeBar} from './Bars.js'

let { canvas } = init();

let ctx = getContext('2d');


const X_POSITION_INIT = 400
const Y_POSITION_INIT = 500

let and = new LogicGate({
    x: 200,
    y: 300
}, 0)

let or = new LogicGate({
    x: 100,
    y: 300
}, 1)

let enemie = new Enemies({
    x: 100,
    y: 200
}, 1)

let bar = new EnergyBar(document.querySelector('.energy-bar'), 75)
let bar2 = new LifeBar(document.querySelector('.life-bar'), 56)

var gameObjects = [ and, or, enemie ]



/****** FUNCTIONS *///////////
function circuito() {
    //Circulito
    ctx.beginPath()
    /* this.ctx.arc() */
    ctx.arc(X_POSITION_INIT, Y_POSITION_INIT, 3, 0, Math.PI * 2, true)
    ctx.fillStyle = "white"
    ctx.closePath()
    ctx.fill()
}





/* or.rotation = Math.PI / 2 */

//Game Loop//
let loop = GameLoop({
  // create the main game loop
    
  update: function() { // update the game state
    /* sprite.update(); */

    
    /* or.update()
    and.update() */

    gameObjects.forEach((object) => object.update())
    
      
      
      
  },
  render: function() { // render the game state
    /* or.render() */
    /* sprite.render(); */
    /* or.render()
    and.render() */

    gameObjects.forEach((object) => object.render())
    circuito()
    
  }


  
});



// start the game//
loop.start();    