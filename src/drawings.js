import { GameObject } from "kontra"

export default class LogicGate extends GameObject.class{
    constructor (properties, type) {
        super(properties)
        this.type = type
        this.ctx = this.context
        this.r = 20
        this.X_POSITION_INIT = 400
        this.Y_POSITION_INIT = 500
    }
    draw () {
        

        this.ctx.fillStyle = "#899"
        this.ctx.strokeStyle = "#000"

        this.ctx.lineWidth = 3
        
        this.ctx.beginPath()
        /* this.ctx.translate(X_POSITION_INIT, Y_POSITION_INIT) */
        
        /* this.ctx.arc */
        /* this.ctx.rotate(Math.PI / 2) */

        //And
        if(this.type === 0) {
            //Semicircle
            this.ctx.arc(this.x, this.y, this.r, Math.PI / 2, Math.PI * 3 / 2, true)
            this.ctx.fill()

            //Rectangle
            this.ctx.moveTo(this.x, this.y -  this.r)
            this.ctx.lineTo(this.x - this.r, this.y - this.r)
            this.ctx.lineTo(this.x - this.r, this.y + this.r)
            this.ctx.lineTo(this.x, this.y + this.r)
            this.ctx.fill()
            this.ctx.stroke()

            //Patitas
            //Patita superior trasera
            this.ctx.beginPath()
            this.ctx.moveTo(this.x - this.r, this.y - this.r + this.r / 2)
            this.ctx.lineTo(this.x - this.r * 2, this.y - this.r + this.r / 2)
            this.ctx.stroke()
            
            //Patita inferior trasera
            this.ctx.beginPath()
            this.ctx.moveTo(this.x - this.r, this.y + this.r / 2)
            this.ctx.lineTo(this.x - this.r * 2, this.y + this.r / 2)
            this.ctx.stroke()

            //Patita delantera
            this.ctx.beginPath()
            this.ctx.moveTo(this.x + this.r, this.y)
            this.ctx.lineTo(this.x + this.r * 2, this.y)
            this.ctx.stroke()   
            
            

        }  
        //Or
        if( this.type === 1) {
            //Trazos
                //curva trasera
                this.ctx.arc(this.x - this.r * 2 - Math.sin(Math.PI / 4), 
                    this.y, this.r / Math.sin(Math.PI / 4), 
                    Math.PI / 4, -(Math.PI / 4), true)

                /////////////ESTE ES EL BUENO
                this.ctx.arcTo(this.x + this.r, this.y - this.r, this.x + this.r * 2, this.y + this.r, this.r*2)
                this.ctx.arcTo(this.x + this.r , this.y + this.r, this.x - this.r *2, this.y + this.r, this.r*2)
                this.ctx.closePath()
                
                this.ctx.fill()
                this.ctx.stroke()
                

                //Patita delantera
                this.ctx.beginPath()
                this.ctx.moveTo(this.x + this.r * 3/2 + 1, this.y + 2)
                this.ctx.lineTo(this.x + this.r * 5/2, this.y +2)
                this.ctx.stroke()

                //Patita superior trasera
                this.ctx.beginPath()
                this.ctx.moveTo(this.x - this.r + 7, this.y - this.r + this.r / 2)
                this.ctx.lineTo(this.x - this.r * 2, this.y - this.r + this.r / 2)
                this.ctx.stroke()
                
                //Patita inferior trasera
                this.ctx.beginPath()
                this.ctx.moveTo(this.x - this.r + 7, this.y + this.r / 2)
                this.ctx.lineTo(this.x - this.r * 2, this.y + this.r / 2)
                this.ctx.stroke()
                
                //Circulito
                /* this.ctx.beginPath()
                this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, true)
                this.ctx.fillStyle = "white"
                this.ctx.closePath() 
                this.ctx.fill() */
        }

        
    }
}    


export class Enemies extends GameObject{
    constructor(properties, type){
        super(properties)
        this.type = type
        this.l = 7
        this.flag = false
    }

    draw (ctx) {
        const X_POSITION_INIT = 400
        const Y_POSITION_INIT = 500
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
}    