import { init, Sprite, GameLoop, getContext } from 'kontra';
import LogicGate, { Enemies } from "./drawings.js"

let { canvas } = init();

let ctx = getContext('2d');

/* let sprite = Sprite({
  x: 100,        // starting x,y position of the sprite
  y: 80,
  color: 'red',  // fill color of the sprite rectangle
  width: 20,     // width and height of the sprite rectangle
  height: 40,
  dx: 2          // move the sprite 2px to the right every frame
}); */

let and = new LogicGate({
    x: 300,
    y: 100
}, 0)

let or = new LogicGate({
    x: 200,
    y: 150
}, 1)


var gameObjects = [ and, or ]


//Game Loop//
let loop = GameLoop({  // create the main game loop
    
  update: function() { // update the game state
    /* sprite.update(); */

    
    or.update()
    and.update()

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
    or.render()
    and.render()

    gameObjects.forEach((object) => object.render())
  }
});



// start the game//
loop.start();    