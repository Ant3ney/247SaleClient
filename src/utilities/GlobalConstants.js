export default {
    buttonBorderRadius: '0.5em',
    thumbnailBorderRadius: '0.5em',
    shadowSettings: '6px 6px 10px rgba(0,0,0,0.3)',
    isSmall: () => {
        return (window.matchMedia("(min-width: 767px)").matches ? false : true);
    }
}