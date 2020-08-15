import Game from './game.js'

let cnvs = document.getElementById("gameScreen")  //canvas
let ctx = cnvs.getContext("2d")            //context

const GAME_WIDTH = 800
const  GAME_HEIGHT = 600

let game = new Game(GAME_WIDTH, GAME_HEIGHT)
game.start()

let lastTime = 0

function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    game.update(deltaTime)
    game.draw(ctx)

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)