export default class Logic_Gate {

    constructor (game, ini_position_x, ini_position_y) {
        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight
        this.r = 30

        this.position = { x: ini_position_x, y: ini_position_y }
        this.speed = { x: 4, y: 2 }
    }

    draw (ctx) {
        ctx.fillStyle = "#899"
        ctx.strokeStyle = "#000"

        //Semicircle
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.r, Math.PI / 2, Math.PI * 3 / 2, true)
        ctx.fill()

        //Rectangle
        ctx.moveTo(this.position.x, this.position.y -  this.r)
        ctx.lineTo(this.position.x - this.r, this.position.y - this.r)
        ctx.lineTo(this.position.x - this.r, this.position.y + this.r)
        ctx.lineTo(this.position.x, this.position.y + this.r)
        ctx.fill()
        ctx.stroke()
        //Patitas
        ctx.lineWidth = this.r / 9
        //Patita superior trasera
        ctx.beginPath()
        ctx.moveTo(this.position.x - this.r, this.position.y - this.r + this.r / 2)
        ctx.lineTo(this.position.x - this.r * 2, this.position.y - this.r + this.r / 2)
        ctx.stroke()
        
        //Patita inferior trasera
        ctx.beginPath()
        ctx.moveTo(this.position.x - this.r, this.position.y + this.r / 2)
        ctx.lineTo(this.position.x - this.r * 2, this.position.y + this.r / 2)
        ctx.stroke()

        //Patita delantera
        ctx.beginPath()
        ctx.moveTo(this.position.x + this.r, this.position.y)
        ctx.lineTo(this.position.x + this.r * 2, this.position.y)
        ctx.stroke()
    }

    update (deltaTime){
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        if(this.position.x + this.r > this.gameWidth || this.position.x < 0 + this.r){
            this.speed.x = -this.speed.x
        }
        if(this.position.y + this.r  > this.gameHeight || this.position.y < 0 + this.r){
            this.speed.y = -this.speed.y
        }
    }
}