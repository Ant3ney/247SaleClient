class Scrollbar{
    scrollTrack: HTMLDivElement; 
    scrollThumb: HTMLDivElement;
    scrollHolder: HTMLDivElement;
    scrollParrent: HTMLDivElement;
    direction: string;
    thumbHeight: number;
    thumbWidth: number;

    constructor(scrollData: any, scrollParrent: HTMLDivElement){
        this.scrollTrack = <HTMLDivElement>scrollData.scrollTrack;
        this.scrollThumb = <HTMLDivElement>scrollData.scrollThumb;
        this.scrollHolder = <HTMLDivElement>scrollData.scrollHolder;
        console.log('scrollParrent below');
        this.scrollParrent = scrollParrent;
        console.log(this.scrollParrent)
    }

    initialise(settings): void{
        if(settings && (settings.notch || (settings.notch === 0 ? true : false))){
            this.scrollHolder.style.right = settings.notch + 'px';
        }
        if(settings && settings.direction){
            this.direction = settings.direction;
            if(settings.direction == 'horizontal'){
                this.scrollTrack.style.height = '5px';
                this.scrollHolder.style.height = '5px';
                this.scrollTrack.style.width = '100%';
                this.scrollHolder.style.right = 'unset';
                this.scrollHolder.style.bottom = '5px';
                this.scrollHolder.style.width = '100%';
            }
        }
        this.show('null');
    }

    onScroll(): void{
        if(this.direction === 'vertical'){
            let thumbHeght = this.getThumbHeight();
            let loacationRatio = this.scrollParrent.scrollTop / (this.scrollParrent.scrollHeight - 0);
            let thumbLocation = (this.scrollTrack.offsetHeight * loacationRatio);
            thumbLocation < 0 ? thumbLocation = 0 : thumbLocation = thumbLocation;
            this.scrollTrack.offsetHeight - (thumbLocation + thumbHeght) < 0 ? thumbLocation = this.scrollTrack.offsetHeight - thumbHeght : thumbLocation = thumbLocation;
            this.scrollThumb.style.top = (thumbLocation + 'px');
        }
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
        if(this.direction === 'horizontal'){
            this.setTrackWidth();
            this.setThumbWidth()
            let tabEle = <HTMLElement>document.querySelector('.tabs');
            let tabOffset = tabEle ? tabEle.offsetTop : 0;
            let tabHeight = tabEle ? tabEle.offsetHeight : 0;
            let searchEle = <HTMLElement>document.querySelector('.search-container');
            let searchOffset = searchEle ? (searchEle.offsetTop ? (searchEle.offsetTop - (tabHeight + tabOffset)) : 0) : 0;
            let searchHeight = searchEle ? searchEle.offsetHeight : 0;
            let offset = this.scrollParrent.offsetHeight + tabHeight + tabOffset + searchOffset + searchHeight + 5;
            this.scrollHolder.style.top = offset + 'px';

            //console.log('tabOffset: ' + tabOffset);
            //console.log('tabHeight: ' + tabHeight);
            //console.log('searchOffset: ' + searchOffset);
            //console.log('searchHeight: ' + searchHeight);
            //console.log('this.scrollParrent.offsetHeight: ' + this.scrollParrent.offsetHeight);   
        }
        else{
            this.setTrackHeight();
            this.setThumbHeight();
        }
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
        this.scrollHolder.style.width = (this.scrollParrent.offsetWidth * 0.95) + 'px';
        this.scrollHolder.style.marginLeft = (this.scrollParrent.offsetWidth * 0.025) + 'px';
        this.scrollHolder.style.marginRight = (this.scrollParrent.offsetWidth * 0.025) + 'px';
    }
    setThumbWidth(): void{
        let width = ((this.scrollParrent.offsetWidth / this.scrollParrent.scrollWidth) * this.scrollTrack.offsetWidth);
        this.thumbWidth = width;
        this.scrollThumb.style.width = width + 'px';
        console.log('this.scrollParrent.offsetWidth: ' + this.scrollParrent.offsetWidth);
        console.log('this.scrollParrent.scrollWidth: ' + this.scrollParrent.scrollWidth);
        console.log('document.querySelector("#skinView").scrollWidth: ' + document.querySelector("#skinView").scrollWidth);
    }
}

export default Scrollbar;