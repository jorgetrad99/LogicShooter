export default class EnergyBar {
    constructor(element, initvalue = 0) {
        this.valueElem = element.querySelector('.energy-bar-value')
        this.fillElem = element.querySelector('.energy-bar-fill')

        this.setValue(initvalue)
    }

    setValue(newValue){
        if(newValue < 0){
            newValue = 0
        }
        if(newValue > 100){
            newValue = 100
        }

        this.value = newValue
        this.update()
    }

    update(){
        const percentage = this.value + '%'
        this.fillElem.style.width = percentage
        this.valueElem.textContent = percentage
    }
}

export class LifeBar {
    constructor(element, initvalue = 0) {
        this.valueElem = element.querySelector('.life-bar-value')
        this.fillElem = element.querySelector('.life-bar-fill')

        this.setValue(initvalue)
    }

    setValue(newValue){
        if(newValue < 0){
            newValue = 0
        }
        if(newValue > 100){
            newValue = 100
        }

        this.value = newValue
        this.update()
    }

    update(){
        const percentage = this.value + '%'
        this.fillElem.style.width = percentage
        this.valueElem.textContent = percentage
    }
}