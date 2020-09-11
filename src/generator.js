/****** Enemies ******/
export default function Generator(ctx){

    this.ctx = ctx
    var CENTER = ctx.canvas.width / 2
  
    this.life = 100
    this.r = 40
    
    this.angle = 0
  
    this.position = {
      x: CENTER,
      y: CENTER
    }
    this.speed = {
      x: 1,
      y: -2
    }
    this.visible = true
  
    this.update = function() {
      this.angle += 1/60
      this.position.x += this.speed.x
      this.position.y += this.speed.y
  
      ctx.lineWidth = 2
  
      ctx.save();
  
      ctx.translate(this.position.x, this.position.y)
  
      ctx.beginPath()
      ctx.rotate(this.angle + 45); 
      ctx.rect(- this.r / 2, - this.r / 2, this.r, this. r)
      ctx.fillStyle = "#899"
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
      
      ctx.restore()
  
      ctx.save()
      ctx.translate(this.position.x, this.position.y)
      
      ctx.fillStyle = "rgb(250, 245, 80)"
      ctx.strokeStyle = "#000"
      ctx.rotate(this.angle); 
      ctx.beginPath()
      ctx.rect(- this.r / 2, - this.r / 2, this.r, this. r)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
  
      ctx.restore()
  
      let dist = Math.sqrt(Math.pow(CENTER - this.position.x, 2) + Math.pow(CENTER - this.position.y, 2))
      
      if(dist >= 200 - Math.sqrt(Math.pow(this.r / 2, 2) * 2) ){
        if(this.position.x > CENTER && this.position.y < CENTER){
          this.speed.x = randomSpeed()
          this.speed.y = -randomSpeed()
        }else if(this.position.x < CENTER && this.position.y < CENTER){
          this.speed.x = -randomSpeed()
          this.speed.y = -randomSpeed()
        }else if(this.position.x < CENTER && this.position.y > CENTER){
          this.speed.x = -randomSpeed()
          this.speed.y = randomSpeed()
        }else if(this.position.x > CENTER && this.position.y > CENTER){
          this.speed.x = randomSpeed()
          this.speed.y = randomSpeed()
        }
      }
    }
  }


function randomSpeed() {
    return Math.random() * (5 - 3) - 3
  }