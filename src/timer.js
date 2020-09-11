export default class Timer {
    constructor(initvalue = 10) {
        const MINUTE = 60

        this.initvalue = initvalue   
        this.time = MINUTE * this.initvalue
        this.valueElem = document.getElementById('countdown')
        this.count=0
        
    }

    update(){
        
        
        const minutes = Math.floor(this.time / 60)
        let seconds = this.time % 60

        seconds = seconds < 10 ? '0' + seconds : seconds

        this.valueElem.innerHTML = `${minutes}: ${seconds}`

        if(this.time > 0 && this.count === 59) {
            this.time = this.time - 1
        }

        if(this.count === 59){
            this.count = 0
        } else {
            this.count++
        }

        
    }
    
}