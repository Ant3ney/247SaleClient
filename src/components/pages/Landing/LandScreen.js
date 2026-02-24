import React, { useContext } from "react";
import { GlobalContext } from '../../../utilities/GlobalContext';
import CallMenu from './CallMenu';
import BigFeatured from './BigFeatured';

export default function LandScreen(){
    const bodyMargin = useContext(GlobalContext).bodyXMargin;
    const size = useContext(GlobalContext).size;
    const featuredDeal = useContext(GlobalContext).featuredDeal;
    let paddingTop;
    let paddingX;

    if(size === 'small'){
        paddingTop = '5vh';
        paddingX = (bodyMargin + 1) + 'em';
    }
    else if(size === 'extrasmall'){
        paddingTop = '5vh';
        paddingX = 1  + 'em';
    }
    else{
        paddingTop = '10vh';
        paddingX = (bodyMargin + 1) + 'em';
    }

    let landingScreenStyle={
        paddingTop: paddingTop,
        height: '100vh',
        background: `url('${process.env.PUBLIC_URL}/LandBg.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingLeft: paddingX,
        paddingRight: paddingX,
        display: 'flex'
    }

	console.log({featuredDeal});

    return(<div 
         style={{
             ...landingScreenStyle
         }}
        >
            <div 
             className="row"
             style={{
                 ...landScreenContentStyle(size)
             }}
            >
                <div 
                 className={size === 'wide' ? "col-6" : "col-md-6"}
                 style={{
                     ...callMenuHolderStyle(size)
                 }}
                >
                    <CallMenu />
                </div>
                <div 
                 className={size === 'wide' ? "col-6" : "col-md-6"}
                 style={{
                     ...bigFeaturedMenuHolderStyle(size)
                 }}
                >
                    {featuredDeal ? 
                    <BigFeatured 
                     deal={featuredDeal}
                    /> : 'loading'}
                </div>
            </div>
        </div>);
}

let landScreenContentStyle = (size) => {
    let alignItems;
    let flexDirection;
    let flexWrap;
    let height;
    let margin;
    if(size === 'small'  || size === 'extrasmall'){
        alignItems = 'unset';
        flexDirection = 'column';
        flexWrap = 'unset';
        height = 'fit-content';
        margin = 'auto';
    }
    else{
        alignItems = 'center';
        flexDirection = 'unset';
        flexWrap = 'wrap';
        height = 'auto';
        margin = 'unset';
    }
    return({
        width: '100%',
        alignItems: alignItems,
        flexWrap: flexWrap,
        flexDirection: flexDirection,
        height: height,
        margin: margin
    }); 
}
let callMenuHolderStyle = (size) => {
    let height;
    if(size === 'small' || size === 'extrasmall'){
        height = 'fit-content'
    }
    else{
        height = 'auto'
    }
    return({
        display: 'flex',
        height: height
    })
}
let bigFeaturedMenuHolderStyle = (size) => {
    let marginTop;
    if(size === 'small' || size === 'extrasmall'){
        marginTop = '0.75em'
    }
    else{
        marginTop = 0
    }

    return({
        marginTop: marginTop
    });
}
