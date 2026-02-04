export class TelemetryManager {
    private scrollX: HTMLElement | null;
    private scrollY: HTMLElement | null;
    private winElem: HTMLElement | null;
    private frameElem: HTMLElement | null;
    private dprElem: HTMLElement | null;
    private screenOrient: HTMLElement | null;

    private nrOfSQuares: HTMLElement | null;
    private nrOfRect: HTMLElement | null;
    private nrOfCircles: HTMLElement | null;
    private nrOfEllipse: HTMLElement | null;


    constructor() {
        this.scrollX = document.getElementById('scrollPosX');
        this.scrollY = document.getElementById('scrollPosY');
        this.winElem = document.getElementById('winDim');
        this.frameElem = document.getElementById('frameRate');
        this.dprElem = document.getElementById('dpr');
        this.screenOrient=document.getElementById('screenOrientation');

        this.nrOfSQuares = document.getElementById('nrOfSQuares');
        this.nrOfRect = document.getElementById('nrOfRect');
        this.nrOfCircles = document.getElementById('nrOfCircles');
        this.nrOfEllipse = document.getElementById('nrOfEllipse');

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

    public updateShapesCount(counts: number[]): void {
        const [sq = 0 , rect = 0, circ = 0, ellipse = 0] = counts;
        
        if (this.nrOfSQuares) this.nrOfSQuares.innerText = sq.toString();
        if (this.nrOfRect) this.nrOfRect.innerText = rect.toString();
        if (this.nrOfCircles) this.nrOfCircles.innerText = circ.toString();
        if (this.nrOfEllipse) this.nrOfEllipse.innerText = ellipse.toString();
    }
}