class Scrollbar{
    scrollTrack: HTMLDivElement; 
    scrollThumb: HTMLDivElement;
    scrollHolder: HTMLDivElement;
    scrollParrent: HTMLDivElement;
    direction: string;
    thumbHeight: number;

    constructor(scrollData: any, scrollParrent: HTMLDivElement){
        this.scrollTrack = <HTMLDivElement>scrollData.scrollTrack;
        this.scrollThumb = <HTMLDivElement>scrollData.scrollThumb;
        this.scrollHolder = <HTMLDivElement>scrollData.scrollHolder;
        this.scrollParrent = scrollParrent;
    }

    initialise(settings): void{
        if(settings && (settings.notch || (settings.notch === 0 ? true : false))){
            this.scrollHolder.style.right = settings.notch + 'px';
        }
        if(settings && settings.direction){
            this.direction = settings.direction;
        }
        this.show('null');
    }

    onScroll(): void{
        let thumbHeght = this.getThumbHeight();
        let loacationRatio = this.scrollParrent.scrollTop / (this.scrollParrent.scrollHeight - 0);
        let thumbLocation = (this.scrollTrack.offsetHeight * loacationRatio);
        thumbLocation < 0 ? thumbLocation = 0 : thumbLocation = thumbLocation;
        this.scrollTrack.offsetHeight - (thumbLocation + thumbHeght) < 0 ? thumbLocation = this.scrollTrack.offsetHeight - thumbHeght : thumbLocation = thumbLocation;
        this.scrollThumb.style.top = (thumbLocation + 'px');
    }
    getThumbHeight(): number{
        return this.thumbHeight;
    }
    show(settings){
        if(settings){
            if(settings.reConnectParrent){
                this.scrollParrent.appendChild(this.scrollHolder);
            }
        }
        this.setTrackHeight();
        this.setThumbHeight();
    }
    setThumbHeight(): void{
        let height = ((this.scrollParrent.offsetHeight / this.scrollParrent.scrollHeight) * this.scrollTrack.offsetHeight);
        this.thumbHeight = height;
        this.scrollThumb.style.height = height + 'px';
    }
    setTrackHeight(): void{
        this.scrollHolder.style.height = (this.scrollParrent.offsetHeight * 0.95) + 'px';
        this.scrollHolder.style.marginTop = (this.scrollParrent.offsetHeight * 0.025) + 'px';
        this.scrollHolder.style.marginBottom = (this.scrollParrent.offsetHeight * 0.025) + 'px';
    }
    setTrackWidth(): void{
        this.scrollHolder.style.width = (this.scrollParrent.offsetHeight * 0.95) + 'px';
        this.scrollHolder.style.marginLeft = (this.scrollParrent.offsetHeight * 0.025) + 'px';
        this.scrollHolder.style.marginRight = (this.scrollParrent.offsetHeight * 0.025) + 'px';
    }
}

export default Scrollbar;