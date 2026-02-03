export class TelemetryManager {

    private scrollX: HTMLElement | null;
    private scrollY: HTMLElement | null;
    private winElem: HTMLElement | null;
    private frameElem: HTMLElement | null;
    private dprElem: HTMLElement | null;
    private screenOrient: HTMLElement | null;


    constructor() {
        this.scrollX = document.getElementById('scrollPosX');
        this.scrollY = document.getElementById('scrollPosY');
        this.winElem = document.getElementById('winDim');
        this.frameElem = document.getElementById('frameRate');
        this.dprElem = document.getElementById('dpr');
        this.screenOrient=document.getElementById('screenOrientation');

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

    updateScreenOrient(): void{
        if(this.screenOrient){
            this.screenOrient.innerText = window.screen.orientation.type;
        }
    }

    updateDPR(): void{
        if (this.dprElem) {
            this.dprElem.innerText = window.devicePixelRatio.toFixed(1);
        }
    }

    updateScroll(): void{
        if (this.scrollX && this.scrollY) {
            const x: number = Math.round(window.scrollX);
            const y: number = Math.round(window.scrollY);

            this.scrollX.innerText = `${x}px`;
            this.scrollY.innerText = `${y}px`;
        }
    }

    updateDimensions() {
        if (this.winElem) {
            this.winElem.innerText = `${window.innerWidth} x ${window.innerHeight}`;
        }
    }

    updateFPS(currentTimeDiff: number) {
        if (this.frameElem) {
            this.frameElem.innerText = currentTimeDiff.toFixed(1);
        }
    }   
}