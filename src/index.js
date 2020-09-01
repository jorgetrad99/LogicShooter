import { init, Sprite, GameLoop, getContext, keyPressed, initKeys, radToDeg, degToRad,  } from 'kontra';
import LogicGate, { Enemies } from "./drawings.js"

let { canvas } = init();
let radians = degToRad(180)

initKeys();

let ctx = getContext('2d');

let custom = Sprite({
  x: 250,
  y: 250,
  color: 'red',
  radius: 50,

  render: function() {
    
    let x = 10;
    let y = 10;

    this.context.fillStyle = this.color;

    this.context.arc(x, y, this.radius, Math.PI / 2, Math.PI * 3 / 2, true)
    this.context.fill()

    //Rectangle
    this.context.moveTo(x,y -  this.radius)
    this.context.lineTo(x - this.radius, y - this.radius)
    this.context.lineTo(x - this.radius, y + this.radius)
    this.context.lineTo(x, y + this.radius)
    this.context.fill()
    this.context.stroke()

    //Patita superior trasera
    this.context.beginPath()
    this.context.moveTo(x - this.radius, y - this.radius + this.radius / 2)
    this.context.lineTo(x - this.radius * 2, y - this.radius + this.radius / 2)
    this.context.stroke()

    //Patita inferior trasera
    this.context.beginPath()
    this.context.moveTo(x - this.radius, y + this.radius / 2)
    this.context.lineTo(x - this.radius * 2, y + this.radius / 2)
    this.context.stroke()

    //Patita delantera
    this.context.beginPath()
    this.context.moveTo(x + this.r, y)
    this.context.lineTo(x + this.r * 2, y)
    this.context.stroke()  

    //this.context.restore()
  },
  update(){
    if (keyPressed('left')) {
      this.rotation += degToRad(-4);
    }
    else if (keyPressed('right')) {
      this.rotation += degToRad(4);
    }
  }

})

let loop = GameLoop({ 
  update: function() {
    custom.update()
  },
  render: function(){
    custom.render();
    custom.scaleX = 0.5
    custom.scaleY = 0.5

  }
});

loop.start();    