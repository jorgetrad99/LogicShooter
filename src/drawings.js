import { GameObject } from "kontra"

export default class LogicGate extends GameObject.class{

    constructor (properties, type) {
        super(properties)
        this.type = type
        this.ctx = this.context
        this.r = 20
    }

    draw () {
        this.ctx.fillStyle = "#899"
        this.ctx.strokeStyle = "#000"

        this.ctx.lineWidth = 3
        
        this.ctx.beginPath()

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
            
            //Circulito
            /* this.ctx.beginPath()
            this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, true)
            this.ctx.fillStyle = "white"
            /* this.ctx.closePath()
            this.ctx.fill() */

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
