export default class LogicGate {

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

        //And
        if(this.tipo === 0) {
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
        //Or
        if( this.tipo === 1) {
            //Trazos
                //curva trasera
                ctx.arc(this.position.x - this.r * 2 - Math.sin(Math.PI / 4), 
                    this.position.y, this.r / Math.sin(Math.PI / 4), 
                    Math.PI / 4, -(Math.PI / 4), true)

                /////////////ESTE ES EL BUENO
                ctx.arcTo(this.position.x + this.r, this.position.y - this.r, this.position.x + this.r * 2, this.position.y + this.r, this.r*2)
                ctx.arcTo(this.position.x + this.r , this.position.y + this.r, this.position.x - this.r *2, this.position.y + this.r, this.r*2)
                ctx.closePath()
                
                ctx.fill()
                ctx.stroke()
                

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

export class Enemies extends LogicGate{
    constructor(game, ini_position_x, ini_position_y, tipo){
        super(game, ini_position_x, ini_position_y, tipo)
        this.l = 7
        this.flag = false
    }

    draw (ctx) {
        ctx.fillStyle = "#899"
        ctx.strokeStyle = "#000"

        ctx.lineWidth = 2
        
        ctx.beginPath()

        //Generator
        if(this.tipo === 0) {
            
            //Circulito
            /* ctx.beginPath()
            ctx.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2, true)
            ctx.fillStyle = "white"
            /* ctx.closePath()
            ctx.fill() */

        }  

        //viruses
        if( this.tipo === 1) {
            //Trazos
                //Cabeza
                ctx.moveTo(this.position.x, this.position.y)
                ctx.lineTo(this.position.x + this.l, this.position.y + this.l)
                ctx.lineTo(this.position.x + this.l, this.position.y + this.l * 2)
                ctx.lineTo(this.position.x, this.position.y + this.l * 3)
                ctx.lineTo(this.position.x - this.l, this.position.y + this.l * 2)
                ctx.lineTo(this.position.x - this.l, this.position.y + this.l)
                ctx.closePath()
                ctx.fill()
                ctx.stroke()
                //Torzo
                ctx.beginPath()
                ctx.moveTo(this.position.x, this.position.y + this.l * 3)
                ctx.lineTo(this.position.x, this.position.y + this.l * 4)
                ctx.stroke()



                //Patitas
                ctx.beginPath()
                ctx.moveTo(this.position.x, this.position.y + this.l * 4)
                if(this.flag === true){     // 2 patitas se ven
                    //Patita Izquierda
                    
                    ctx.lineTo(this.position.x - this.l * 3/ 2, this.position.y + this.l * 4 + this.l / 2)
                    ctx.lineTo(this.position.x - this.l * 3/ 2, this.position.y + this.l * 4 + this.l * 3 / 2)
                    ctx.stroke()
                    //Patita de la derecha
                    ctx.beginPath()
                    ctx.moveTo(this.position.x, this.position.y + this.l * 4)
                    ctx.lineTo(this.position.x + this.l * 3/ 2, this.position.y + this.l * 4 + this.l / 2)
                    ctx.lineTo(this.position.x + this.l * 3/ 2, this.position.y + this.l * 4 + this.l * 3 / 2)
                    ctx.stroke()
                } else if(this.flag === false) { //Solo se ven 1 patita
                    ctx.lineTo(this.position.x, this.position.y + this.l * 4 + this.l * 3 / 2)
                    ctx.stroke()
                }
                
                //Circulito
                /* ctx.beginPath()
                ctx.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2, true)
                ctx.fillStyle = "white"
                ctx.closePath() 
                ctx.fill() */

        }
    }
    
    setFlag(flag){
        this.flag = flag
    }

    update (){
        /* this.position.x += this.speed.x
        this.position.y += this.speed.y

        if(this.position.x + this.r > this.gameWidth || this.position.x < 0 + this.r){
            this.speed.x = -this.speed.x
        }
        if(this.position.y + this.r  > this.gameHeight || this.position.y < 0 + this.r){
            this.speed.y = -this.speed.y
        } */
        if(this.flag === false) {
            this.setFlag(true)
        } else {
            this.setFlag(false)
        }
        
    }
    

}