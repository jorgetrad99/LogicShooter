import Logic_Gate from "./logic_gate.js"


export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
    }

    start() {
        /* this.paddle = new Paddle(this)
        this.ball = new Ball(this)
        new InputHandler(this.paddle) */

        this.and_gate = new Logic_Gate(this, 200, 100, 0)
        this.or_gate = new Logic_Gate(this, 200, 200, 1)
        this.or_gate1 = new Logic_Gate(this, 500, 400, 1)


        this.gameObjects = [ this.and_gate, this.or_gate, this.or_gate1 ]
    }

    /* update(deltaTime) {
        this.gameObjects.forEach((object) => object.update(deltaTime))
    } */

    draw(ctx) {
        
        /* this.paddle.draw(ctx)
        this.ball.draw(ctx) */
        this.gameObjects.forEach(object => object.draw(ctx))
    }
}