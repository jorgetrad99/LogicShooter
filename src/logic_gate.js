export default class Logic_Gate {

    constructor (game, ini_position_x, ini_position_y, tipo) {
        this.gameWidth = game.gameWidth
        this.gameHeight = game.gameHeight
        this.tipo = tipo        // If 0 => And... If 1 => Or
        this.r = 30

        this.position = { x: ini_position_x, y: ini_position_y }
    }

    draw (ctx) {
        ctx.fillStyle = "#899"
        ctx.strokeStyle = "#000"

        ctx.lineWidth = 5
        
        ctx.beginPath()

        //Or
        if(this.tipo === 0) {
            /* ctx.rotate(Math.PI / 6) */
            /* ctx.fillRect(0, 0, 40, 40) */
            //Semicircle
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
            
            //Circulito
            /* ctx.beginPath()
            ctx.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2, true)
            ctx.fillStyle = "white"
            /* ctx.closePath()
            ctx.fill() */

        }  
        
        if( this.tipo === 1) {
            //Trazos
            /* ctx.moveTo(this.position.x, this.position.y -  this.r) */
                //curva trasera
                ctx.arc(this.position.x - this.r * 2 - Math.sin(Math.PI / 4), 
                    this.position.y, this.r / Math.sin(Math.PI / 4), 
                    Math.PI / 4, -(Math.PI / 4), true)

                //linea de arriba
                /* ctx.lineTo(this.position.x - this.r / 2, this.position.y - this.r) */
                //Curva delantera arriba
                /* ctx.arcTo((this.position.x - this.r / 2) / 2, 
                (this.position.y - this.r) / 2, this.position.x + this.r, this.position.y, this.r / Math.cos(Math.PI / 6)) */
                
                /* ctx.arcTo(this.position.x - this.r, this.position.y - this.r, this.position.x + this.r * 2, this.position.y, this.r * 4) */


                /////////////ESTE ES EL BUENO
                ctx.arcTo(this.position.x + this.r, this.position.y - this.r, this.position.x + this.r * 2, this.position.y + this.r, this.r*2)
                ctx.arcTo(this.position.x + this.r , this.position.y + this.r, this.position.x - this.r *2, this.position.y + this.r, this.r*2)
                ctx.closePath()
                
                ctx.fill()
                ctx.stroke()
                
                
                /* ctx.moveTo(this.position.x-this.r-1.55, this.position.y+this.r)
                ctx.arcTo(this.position.x + this.r, this.position.y + this.r, this.position.x + this.r * 2, this.position.y - this.r, this.r*11/6)
                

                ctx.stroke()
                ctx.fill()

                ctx.beginPath()
                ctx.strokeStyle='white'
                ctx.moveTo(this.position.x - this.r / 2, this.position.y - this.r)
                ctx.lineTo(this.position.x + this.r, this.position.y)
                ctx.strokeStyle='blue'
                ctx.lineTo(this.position.x + this.r * 2, this.position.y + this.r/3*2)
                ctx.stroke() */


                /* ctx.arc(this.position.x - this.r / 2, 
                    this.position.y, 
                    this.r / Math.cos(Math.PI / 6), Math.PI / 2, Math.PI / 3, false)
 */                //linea de abajo
                /* ctx.lineTo(this.position.x, this.position.y + this.r) */
                //Curva delantera abajo
                /* ctx.arc(this.position.x + this.r, this.position.y, this.r, Math.PI * 3 / 2, Math.PI * 4 / 3, true) */

            //linea de abajo
            /* ctx.moveTo(this.position.x, this.position.y +  this.r) */
            
            /* ctx.closePath()
            ctx.stroke()
            
            //Curva trasera
            ctx.beginPath() */
            /* ctx.moveTo(this.position.x, this.position.y - this.r - Math.sin(Math.PI / 4)) */
            
            //Curva trasera
            /* ctx.arc(this.position.x - this.r * 2 - Math.sin(Math.PI / 4), this.position.y, this.r / Math.sin(Math.PI / 4), Math.PI / 4, -(Math.PI / 4), true) */



            //Curva delantera arriba
            /* ctx.arc(this.position.x + this.r, this.position.y, this.r, Math.PI / 3, Math.PI / 2, ) */
            
            
            /* ctx.closePath() */


            /* ctx.beginPath()line
            ctx.moveTo(this.position.x - this.r * 2, this.position.y + this.r) */
            /* ctx.bezierCurveTo(this.position.x + this.r, this.position.y, this.position.x + this.r, this.position.y, this.position.x - 2 * this.r, this.position.y - this.position) */
            
            /* ctx.arc(this.position.x - 4 * this.r, this.position.y, this.r * 2, Math.PI / 8, Math.PI * 15 / 8, true) */
            
            /* ctx.closePath() */
            
            /* ctx.fill() */

            //Patita delantera
            /* ctx.beginPath()
            ctx.moveTo(this.position.x + this.r * 3/2 + 1, this.position.y + 2)
            ctx.lineTo(this.position.x + this.r * 5 / 2, this.position.y + 2)
            ctx.stroke()    */

            //Patita delantera
            ctx.beginPath()
            ctx.moveTo(this.position.x + this.r * 3/2 + 1, this.position.y + 2)
            ctx.lineTo(this.position.x + this.r * 5/2, this.position.y +2)
            ctx.stroke()

            //Patita superior trasera
            ctx.beginPath()
            ctx.moveTo(this.position.x - this.r + 7, this.position.y - this.r + this.r / 2)
            ctx.lineTo(this.position.x - this.r * 2, this.position.y - this.r + this.r / 2)
            ctx.stroke()
            
            //Patita inferior trasera
            ctx.beginPath()
            ctx.moveTo(this.position.x - this.r + 7, this.position.y + this.r / 2)
            ctx.lineTo(this.position.x - this.r * 2, this.position.y + this.r / 2)
            ctx.stroke()
            
            //Circulito
            /* ctx.beginPath()
            ctx.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2, true)
            ctx.fillStyle = "white"
            ctx.closePath() 
            ctx.fill() */
        }

        
    }

    update (deltaTime){
        /* this.position.x += this.speed.x
        this.position.y += this.speed.y

        if(this.position.x + this.r > this.gameWidth || this.position.x < 0 + this.r){
            this.speed.x = -this.speed.x
        }
        if(this.position.y + this.r  > this.gameHeight || this.position.y < 0 + this.r){
            this.speed.y = -this.speed.y
        } */
    }
}