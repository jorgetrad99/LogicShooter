import And_Logic_Gate from './logic_gate.js'

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
    }

    start() {
        /* this.paddle = new Paddle(this)
        this.ball = new Ball(this)
        new InputHandler(this.paddle) */

        this.gate = new And_Logic_Gate(this, 200, 100)


        this.gameObjects = [ this.gate ]
    }

    update(deltaTime) {
        this.gameObjects.forEach((object) => object.update(deltaTime))
    }

    draw(ctx) {
        this.gate.draw(ctx)   
    }
}