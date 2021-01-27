import React, { useEffect, useContext } from 'react';
import globalCostants from '../../../utilities/GlobalConstants';
import { GlobalContext } from '../../../utilities/GlobalContext';

export default function BigFeatured(){
    useEffect(() => {
        
    }, []);
    const size = useContext(GlobalContext).size;
    return(<div
     style={{
         ...bigFeaturedStyle
     }}
    >
        <div
         id='featured-game-image-container'
         style={{
            ...featuredContainer
         }}
        >
            <img 
             src={process.env.PUBLIC_URL + 'FeaturedPlaceholder.jpg'}
             style={{
                ...featuredImage
             }}
            >
            </img>
        </div>
        <div
         style={{
            ...featuredInfoContainer(size)
         }}
        >
            <div
             style={{
                 ...featuredInfoRow
             }}
            >
                <p
                 style={{
                     ...infoText(size)
                 }}
                >
                    Deus Ex: Standard edition
                </p>
            </div>
            <div
             style={{
                 ...featuredInfoBottomRow(size)
             }}
            >
                <div
                 style={{
                    ...leftInfo
                 }}
                >
                    <p
                     style={{
                         ...infoText(size),
                         ...{
                             textDecoration: 'line-through',
                             color: 'white',
                         }
                     }}
                    >
                        $29.99
                    </p>
                    <p
                     style={{
                         ...infoText(size),
                         marginLeft: '0.3em'
                     }}
                    >
                        $9.99
                    </p>
                    <div
                     style={{
                         ...percentOff,
                         ...{
                            display: 'flex',
                            marginLeft: '0.3em'
                         }
                     }}
                    >
                        <p
                         style={{
                            ...percentOffText(size)
                         }}
                        >
                            -33%
                        </p>
                        
                    </div>
                </div>
                <div
                 style={{
                    ...rightInfo
                 }}
                >
                    <p
                     style={{
                         ...infoText(size),
                         ...{
                            marginRight: '0.3em'
                         }
                     }}
                    >
                        Get it on
                    </p>
                    <div
                     style={{
                         ...storeImageContainer
                     }}
                    >
                        <img 
                         style={{
                             ...storeImage(size),
                             ...{
 
                             }
                         }}
                         src={process.env.PUBLIC_URL + 'GreenManLogo.png'}
                        ></img>
                    </div>
                </div>
            </div>
        </div>
        <div
         style={{
             ...featureActionContainer
         }}
        >
            <button
             style={{
                 ...featureButton(size),
                 ...{
                     marginRight: 'auto'
                 }
             }}
            >
                Visit Store
            </button>
            <button
             style={{
                 ...featureButton(size),
                 ...{
                     marginLeft: 'auto'
                 }
             }}
            >
                Track Game
            </button>
        </div>
    </div>);
}

let bigFeaturedStyle={
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}

let featuredContainer={
    width: '100%',
    paddingTop: '57.305194805%',
    display: 'flex',
    position: 'relative'
}
let featuredImage={
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    maxHeight: '100%',
    margin: 'auto',
    zIndex: 0,
    borderRadius: globalCostants.thumbnailBorderRadius
}
let featuredInfoContainer = (size) => {
    let padding;
    if(size == 'small'){
        padding = '0.2em'
    }
    else{
        padding = '0.5em'
    }
    return({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#112123',
        padding: padding,
        marginTop: '0.5em',
        borderRadius: globalCostants.thumbnailBorderRadius
    });
}
let featuredInfoRow={
    display: 'flex'
}
let featuredInfoBottomRow = (size) => {
    let marginTop;
    if(size == 'small' || size == 'wide'){
        marginTop = '0.15em';
    }
    else{
        marginTop = '0.3em';
    }
    return({
        display: 'flex',
        marginTop: marginTop
    });
}
let leftInfo={
    display: 'flex'
}
let rightInfo={
    display: 'flex',
    marginLeft: 'auto'
}
let infoText = (size) => {
    let fontSize;
    if(size == 'small' || size == 'wide'){
        fontSize = '0.75em';
    }
    else{
        fontSize = '1.2em';
    }

    return({
        color: '#BAC165',
        padding: 0,
        marginBottom: 0,
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: fontSize,
        height: 'fit-content'
    });
}
let percentOff={
    color: 'white',
    backgroundColor: '#DA0A18',
    padding: 0,
    margin: 0,
    borderRadius: globalCostants.thumbnailBorderRadius,
    padding: '0.2em',
    paddingTop: '0.1em',
    paddingBottom: '0.1em'
}
let percentOffText = (size) => {
    let fontSize;
    if(size == 'small' || size == 'wide'){
        fontSize = '0.75em'
    }
    else{
        fontSize = '1em'
    }

    return({
        margin: 'auto',
        fontSize: fontSize
    });
}
let storeImageContainer={
    backgroundColor: '#278D8A',
    borderRadius: globalCostants.thumbnailBorderRadius,
    display: 'flex'
}
let storeImage = (size) => {
    let maxHeight;
    if(size == 'small' || size == 'wide'){
        maxHeight = '1em'
    }
    else{
        maxHeight = '1.5em'
    }

    return({
        madWidth: '6em',
        maxHeight: maxHeight,
        padding: '0.12em',
        margin: 'auto'
    });
}
let featureActionContainer={
    width: '100%',
    marginTop: '0.5em',
    display: 'flex'
}
let featureButton = (size) => {
    let padding;
    if(size == 'small' || size == 'wide'){
        padding = '0.37em';
    }
    else{
        padding = '0.75em';
    }

    return({
        borderRadius: globalCostants.buttonBorderRadius,
        border: 0,
        width: '48.5%',
        padding: padding,
        backgroundColor: '#BAC165'
    });
}