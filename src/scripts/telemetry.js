export class TelemetryManager {
    constructor() {
        this.scrollX = document.getElementById('scrollPosX');
        this.scrollY = document.getElementById('scrollPosY');
        this.winElem = document.getElementById('winDim');
        this.frameElem = document.getElementById('frameRate');
        this.dprElem = document.getElementById('dpr');
        this.screenOrient=document.getElementById('screenOrientation');

        this.performance = performance.now();
        this.frameCount = 0;

        this.initListeners();
    }

    initListeners() {
        console.log(window);

        window.addEventListener('scroll', () => this.updateScroll());
        window.addEventListener('resize', () => this.updateDimensions());
        window.addEventListener('deviceorientation', () => this.updateDPR());
        window.addEventListener('orientationchange', () => this.updateScreenOrient());
        this.updateScroll();
        this.updateDimensions();
        this.updateDPR();
        this.updateScreenOrient();
    }

    updateScreenOrient(){
        if(this.screenOrient){
            this.screenOrient.innerText = window.screen.orientation.type;
        }
    }

    updateDPR() {
        if (this.dprElem) {
            this.dprElem.innerText = window.devicePixelRatio.toFixed(1);
        }
    }

    updateScroll() {
        if (this.scrollX && this.scrollY) {
            const x = Math.round(window.scrollX);
            const y = Math.round(window.scrollY);

            this.scrollX.innerText = `${x}px`;
            this.scrollY.innerText = `${y}px`;
        }
        else{
            this.scrollX.innerText = `-`;
            this.scrollY.innerText = `-`;
        }
    }

    updateDimensions() {
        if (this.winElem) {
            this.winElem.innerText = `${window.innerWidth} x ${window.innerHeight}`;
        }
    }

    updateFPS(currentTimeDiff) {
        if (this.frameElem) {
            this.frameElem.innerText = currentTimeDiff.toFixed(1);
        }
    }   
}