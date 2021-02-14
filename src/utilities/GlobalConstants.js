let GlobalConstants = {
    buttonBorderRadius: '0.5em',
    thumbnailBorderRadius: '0.5em',
    shadowSettings: '6px 6px 10px rgba(0,0,0,0.3)',
    isSmall: () => {
        return (window.matchMedia("(min-width: 767px)").matches ? false : true);
    },
    thumbNailLoaded: (target, setOrientation) => {
        let img = target.target;
        let height = img.offsetHeight;
        let width = img.offsetWidth;

        if((height / width) < 1){
            setOrientation('horizontal');
            img.style.height = 'auto';
            img.style.width = '100%';
        }
        else{
            setOrientation('vertical');
            img.style.height = '100%';
            img.style.width = 'auto';
        }
    }
}

export default GlobalConstants;