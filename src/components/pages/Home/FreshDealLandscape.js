import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import GlobalConstants from '../../../utilities/GlobalConstants';
import StoreLogo from '../../StoreLogo';
import TrackGame from '../../Deal/TrackGame';

export default function FreshDealLandscape(props){
    const size = useContext(GlobalContext).size;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;
    const [orientation, setOrientation] = useState('horizontal');
    let dealName = props.deal.title;

    if(dealName.length > 30){
        dealName = dealName.substr(0, getCutOffNumber(size)) + "\u2026";
    }

    return(<div
     style={{
         ...freshDealLandscape(size, (props.bottom || props.middle))
     }}
    >
        <div
         style={{
             ...freshDealImageContainer(size)
         }}
        >
            <div
             style={{
                 ...freshDealImageBackground(size)
             }}
            >
                <img 
                 src={props.deal.thumb}
                 style={{
                    ...freshDealImage(size, orientation)
                 }}
                 alt='Game Thumbnail'
                 onLoad={(event) => {GlobalConstants.thumbNailLoaded(event, setOrientation)}}
                >
                </img>
            </div>
        </div>
        <div
         style={{
             ...dealInfoContainer(size)
         }}
        >
            <div
             style={{
                 ...dealLeftSide(size)
             }}
            >
                <div
                 style={{
                     ...dealInfoRow(size, 'top')
                 }}
                >
                    <p
                     style={{
                        ...infoText(size),
                        ...{
                            color: '#BAC165',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%'
                        }
                     }}
                    >
                        {dealName}
                    </p>
                </div>
                <div
                 style={{
                     ...dealInfoRow(size, 'bottom')
                 }}
                >
                    <StoreLogo 
                     variant='freshlandscape'
                     id={props.deal.storeID}
                    />
                    <button
                     style={{
                         ...actionButton(size),
                         ...{
                            marginRight: '0.4em'
                         }
                     }}
                     onClick={() => {
                        window.open("https://www.cheapshark.com/redirect?dealID=" + props.deal.dealID);
                     }}
                    >
                        <p
                         style={{
                             ...actionText(size)
                         }}
                        >
                            Visit Store
                        </p>
                    </button>
                    <TrackGame 
                     deal={props.deal}
                     addStyle={{
                        ...actionButton(size)
                     }}
                     addStyleText={{
                         ...actionText(size)
                     }}
                    />
                    
                </div>
            </div>
            <div
             style={{
                 ...dealInfoRightSide(size)
             }}
            >
                <div
                 style={{
                     ...percentOff(size)
                 }}
                >
                    <p
                     style={{
                         ...percentOffText(size)
                     }}
                    >
                        {'-' + props.deal.savings.split('.')[0] + '%'}
                    </p>
                </div>
                <div
                 style={{
                     ...priceInfoContainter(size)
                 }}
                >
                    <p
                     style={{
                        ...infoText(size),
                        ...{
                            color: 'white',
                            textDecoration: 'line-through'
                        }
                     }}
                    >
                        {props.deal.normalPrice}
                    </p>
                    <p
                     style={{
                        ...infoText(size),
                        ...{
                            color: '#BAC165'
                        }
                     }}
                    >
                        {props.deal.salePrice}
                    </p>
                </div>
            </div>
        </div>
    </div>);
}

let freshDealLandscape = (size, notTop) => {
    let notTopMarginTop;
    let marginRight;
    let height;

    if(size === 'extralarge'){
        notTopMarginTop = 'auto';
        height = 'auto';
    }
    else if(size !== 'extrasmall'){
        notTopMarginTop = '2rem';
        height = '100%';
    }
    else{
        notTopMarginTop = '1rem';
        height = '100%';
    }

    if(size === 'extralarge'){
        marginRight = '0.5rem'
    }
    else{
        marginRight = '0rem';
        height = '100%';
    }

    return({
        display: 'flex',
        marginTop: notTop ? notTopMarginTop : 'unset',
        marginRight: marginRight,
        height: height
    })
}
let freshDealImageContainer = size => {

    return({
        width: '33%',
        display: 'flex'
    });
}
let freshDealImageBackground = size => {

    return({
        width: '100%',
        paddingBottom: 0,
        paddingTop: '46.739130434%',
        display: 'flex',
        position: 'relative',
        backgroundColor: '#112123'
    });
}
let freshDealImage = (size, orientation) => {
    let height;
    let width;
    //console.log(orientation);

    if(orientation === 'vertical'){
        height = '100%';
        width = 'auto';
    }
    else if(orientation === 'horizontal'){
        height = 'auto';
        width = '100%';
    }
    return({
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        maxHeight: '100%',
        maxWidth: '100%',
        margin: 'auto',
        zIndex: 0
    });
}
let infoText = size => {
    let fontSize;
    if(size === 'large' || size === 'extralarge'){
        fontSize = '25px';
    }
    else if(size === 'medium' || size === 'wide'){
        fontSize = '15px';
    }
    else if(size === 'small'){
        fontSize = '10px';
    }
    else{
        fontSize = '8px';
    }

    return({
        margin: 0,
        fontSize: fontSize
    })
}
let dealInfoContainer = size => {
    let paddingTop;
    let paddingBottom;
    if(size === 'extrasmall'){
        paddingTop = '0.2rem';
        paddingBottom = '0.2rem';
    }
    else if(size === 'wide'){
        paddingTop = '0.5rem';
        paddingBottom = '0.5rem';
    }
    else{
        paddingTop = '0.5rem';
        paddingBottom = '0.5rem';
    }

    return({
        width: '100%',
        height: '100%',
        backgroundColor: '#112123',
        display: 'flex',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        minHeight: '100%'
    })
}
let dealLeftSide = size => {

    return({
        display: 'flex',
        flexDirection: 'column'
    });
}
let dealInfoRow = (size, position) => {

    return({
        width: '100%',
        display: 'flex',
        height: '100%'
    });
}
let storeLogoContainer = size => {


    return({
        display: 'flex',
        backgroundColor: '#278D8A',
        borderRadius: GlobalConstants.buttonBorderRadius,
        marginTop: 'auto',
        marginBottom: 'auto',
        height: '90%'

    });
}
let storeImage = size => {
    let maxHeight;
    let padding;
    if(size === 'extrasmall'){
        maxHeight = '1em';
        padding = '0.12em';
    }
    else{
        maxHeight = '1.5em';
        padding = '0.25em';
    }

    return({
        madWidth: '6em',
        maxHeight: maxHeight,
        padding: padding,
        margin: 'auto'
    });
}
let actionButton = size => {
    
    return({
        display: 'flex',
        backgroundColor: '#BAC165',
        borderRadius: GlobalConstants.buttonBorderRadius,
        padding: '5px',
        marginTop: 'auto',
        marginBottom: 'auto',
        outline: 'none',
        border: 0
    });
}
let actionText = size => {
    let fontSize;
    if(size === 'large' || size === 'extralarge'){
        fontSize = '25px';
    }
    else if(size === 'medium'){
        fontSize = '15px';
    }
    if(size === 'wide'){
        fontSize = '12px';
    }
    else if(size === 'small'){
        fontSize = '10px';
    }
    else if(size === 'extrasmall'){
        fontSize = '8px';
    }

    return({
        margin: 'auto',
        height: 'fit-content',
        fontSize: fontSize,
        width: 'max-content'
    })
}
let dealInfoRightSide = size => {
    return({
        display: 'flex',
        marginLeft: 'auto'
    });
}
let percentOff = size => {
    
    return({
        padding: '0.12rem',
        borderRadius: GlobalConstants.buttonBorderRadius,
        backgroundColor: '#DA0A18',
        color: 'white',
        display: 'flex',
        height: '100%',
        marginTop: 'auto',
        marginBottom: 'auto'
    });
}
let percentOffText = size => {
    let fontSize;
    if(size === 'large' || size === 'extralarge'){
        fontSize = '50px'
    }
    else if(size === 'medium'){
        fontSize = '30px'
    }
    else if(size === 'wide'){
        fontSize = '20px';
    }
    else{
        fontSize = '15px'
    }

    return({
        fontSize: fontSize,
        margin: 'auto'
    });
}
let priceInfoContainter = size => {

    return({
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '0.4em'
    });
}
let getCutOffNumber = (size) => {
    if(size === 'wide'){
        return 24;
    }
    else{
        return 29;
    }
}