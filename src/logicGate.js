import { degToRad } from 'kontra'

/****** LOGIC GATES ******/
export default function LogicGate(x, y, angle, colorSup, colorInf, type, ctx){
    
    //Inherite the ctx from the index
    this.ctx = ctx

    //Take the size of the canvas (800) and divide by 2 = (400)
    var CENTER = ctx.canvas.width / 2

    this.r = 20
    if(type === 0){
      this.x = x + 10
    }else {
      this.x = x + 2
    }
    
    this.y = y
    this.angle = angle
    this.type = type
    this.colorSup = colorSup
    this.colorInf = colorInf
  
    this.canShoot = true
    this.lasers = []
  
    this.update = function(){
      ctx.fillStyle = "#899"
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 3
      ctx.save();
      ctx.translate(CENTER, CENTER);
      ctx.rotate(this.angle);
  
      ctx.beginPath()
          
      //And
      if(this.type === 0) {
        //Semicircle
        ctx.arc(this.x, this.y, this.r, degToRad(90), degToRad(270), true)
        ctx.fill()
  
        //Rectangle
        ctx.moveTo(this.x, this.y -  this.r)
        ctx.lineTo(this.x - this.r, this.y - this.r)
        ctx.lineTo(this.x - this.r, this.y + this.r)
        ctx.lineTo(this.x, this.y + this.r)
        ctx.fill()
        ctx.stroke()
  
        //Patitas
        //Patita superior trasera
        ctx.beginPath()
        ctx.moveTo(this.x - this.r, this.y - this.r + this.r / 2)
        ctx.lineTo(this.x - this.r * 2, this.y - this.r + this.r / 2)
        
        ctx.stroke()
        
        //Patita inferior trasera
        ctx.beginPath()
        ctx.moveTo(this.x - this.r, this.y + this.r / 2)
        ctx.lineTo(this.x - this.r * 2, this.y + this.r / 2)
        ctx.stroke()
  
        //Patita delantera
        ctx.beginPath()
        ctx.moveTo(this.x + this.r, this.y)
        ctx.lineTo(this.x + this.r * 2, this.y)
        ctx.closePath()
        ctx.stroke()
        
        //Entradas
        //Entrada superior
        ctx.beginPath()
        ctx.arc(this.x - this.r * 2, this.y - this.r + this.r / 2, this.r / 3, 0, degToRad(360), true)
        ctx.fillStyle = this.colorSup
        ctx.fill() 
  
        //Entrada inferior
        ctx.beginPath()
        ctx.arc(this.x - this.r * 2, this.y + this.r / 2, this.r / 3, 0, degToRad(360), true)
        ctx.fillStyle = this.colorInf
        ctx.fill()
        ctx.closePath()
      }
      //Or
      if( this.type === 1) {
        //Trazos
        //curva trasera
        ctx.arc(this.x - this.r * 2 - Math.sin(degToRad(45)), 
            this.y, this.r / Math.sin(degToRad(45)), 
            degToRad(45), -degToRad(45), true)
  
        /////////////ESTE ES EL BUENO
        ctx.arcTo(this.x + this.r, this.y - this.r, this.x + this.r * 2, this.y + this.r, this.r*2)
        ctx.arcTo(this.x + this.r , this.y + this.r, this.x - this.r *2, this.y + this.r, this.r*2)
        ctx.closePath()
        
        ctx.fill()
        ctx.stroke()
        
        //Patita delantera
        ctx.beginPath()
        ctx.moveTo(this.x + this.r * 3/2 + 1, this.y + 2)
        ctx.lineTo(this.x + this.r * 5/2, this.y +2)
        ctx.stroke()
  
        //Patita superior trasera
        ctx.beginPath()
        ctx.moveTo(this.x - this.r + 7, this.y - this.r + this.r / 2)
        ctx.lineTo(this.x - this.r * 2, this.y - this.r + this.r / 2)
        ctx.stroke()
        
        //Patita inferior trasera
        ctx.beginPath()
        ctx.moveTo(this.x - this.r + 7, this.y + this.r / 2)
        ctx.lineTo(this.x - this.r * 2, this.y + this.r / 2)
        ctx.stroke()
  
        //Entradas
        //Entrada superior
        ctx.beginPath()
        ctx.arc(this.x - this.r * 2, this.y - this.r + this.r / 2, this.r / 3, 0, degToRad(360), true)
        ctx.fillStyle = this.colorSup
        ctx.fill() 
  
        //Entrada inferior
        ctx.beginPath()
        ctx.arc(this.x - this.r * 2, this.y + this.r / 2, this.r / 3, 0, degToRad(360), true)
        ctx.fillStyle = this.colorInf
        ctx.fill() 
        
      }
      ctx.restore();    
    }  
  }
  