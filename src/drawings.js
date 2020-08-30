import { GameObject } from "kontra"

export default class LogicGate extends GameObject.class{

    constructor (properties, type) {
        super(properties)
        this.type = type
        this.ctx = this.context
        this.r = 20
        this.angle = 0
    }

    draw () {
        this.ctx.fillStyle = "#899"
        this.ctx.strokeStyle = "#000"

        this.ctx.lineWidth = 3
        
        this.ctx.translate(400, 400)
        
        /* this.ctx.angleMode(DEGREES) */
        this.ctx.rotate(Math.PI)
        /* this.ctx.rotate(Math.PI) */
        
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

    rot(){
        this.ctx.rotate(this.angle)
        this.angle++
    }
}    

export class Enemies extends GameObject.class{
    constructor (properties, type) {
        super(properties)
        this.type = type
        this.ctx = this.context
        this.l = 7
        this.angle = 0
    }

    draw () {
        this.ctx.fillStyle = "#899"
        this.ctx.strokeStyle = "#000"

        this.ctx.lineWidth = 2
        this.ctx.translate(400, 400)
        this.ctx.beginPath()

        //Generator
        if(this.type === 0) {
            
            //Circulito
            /* this.ctx.beginPath()
            this.ctx.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2, true)
            this.ctx.fillStyle = "white"
            /* this.ctx.closePath()
            this.ctx.fill() */

        }  

        //viruses
        if( this.type === 1) {
            //Trazos
                //Cabeza
                this.ctx.moveTo(this.x, this.y)
                this.ctx.lineTo(this.x + this.l, this.y + this.l)
                this.ctx.lineTo(this.x + this.l, this.y + this.l * 2)
                this.ctx.lineTo(this.x, this.y + this.l * 3)
                this.ctx.lineTo(this.x - this.l, this.y + this.l * 2)
                this.ctx.lineTo(this.x - this.l, this.y + this.l)
                this.ctx.closePath()
                this.ctx.fill()
                this.ctx.stroke()
                //Torzo
                this.ctx.beginPath()
                this.ctx.moveTo(this.x, this.y + this.l * 3)
                this.ctx.lineTo(this.x, this.y + this.l * 4)
                this.ctx.stroke()



                //Patitas
                this.ctx.beginPath()
                this.ctx.moveTo(this.x, this.y + this.l * 4)
                if(this.flag === true){     // 2 patitas se ven
                    //Patita Izquierda
                    
                    this.ctx.lineTo(this.x - this.l * 3/ 2, this.y + this.l * 4 + this.l / 2)
                    this.ctx.lineTo(this.x - this.l * 3/ 2, this.y + this.l * 4 + this.l * 3 / 2)
                    this.ctx.stroke()
                    //Patita de la derecha
                    this.ctx.beginPath()
                    this.ctx.moveTo(this.x, this.y + this.l * 4)
                    this.ctx.lineTo(this.x + this.l * 3/ 2, this.y + this.l * 4 + this.l / 2)
                    this.ctx.lineTo(this.x + this.l * 3/ 2, this.y + this.l * 4 + this.l * 3 / 2)
                    this.ctx.stroke()
                } else if(this.flag === false) { //Solo se ven 1 patita
                    this.ctx.lineTo(this.x, this.y + this.l * 4 + this.l * 3 / 2)
                    this.ctx.stroke()
                }
                
                //Circulito
                /* this.ctx.beginPath()
                this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, true)
                this.ctx.fillStyle = "white"
                this.ctx.closePath() 
                this.ctx.fill() */

        }
    }
    
    setFlag(flag){
        this.flag = flag
    }

    update (){
        
        if(this.flag === false) {
            this.setFlag(true)
        } else {
            this.setFlag(false)
        }
        
    }
    

}