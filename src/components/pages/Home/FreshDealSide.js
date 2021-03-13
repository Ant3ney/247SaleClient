import React, { useContext } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import globalConstants from '../../../utilities/GlobalConstants';
import StoreLogo from '../../StoreLogo';
import GameThumbnail from '../../GameThumbnail';
import TrackGame from '../../Deal/TrackGame';

export default function FreshDealSide(props){
    const size = useContext(GlobalContext).size;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;
    const setTrackedDeal = useContext(GlobalContext).setTrackedDeal;
    if(!props.deal){
        console.log('Deal: ' + props.deal);
        return(<>Loading</>);
    }
    let dealName = props.deal.internalName;
    if(dealName.length > (getNameCutoffSize(size) + 3)){
        dealName =  dealName = dealName.substr(0, getNameCutoffSize(size)) + "\u2026";
    }

    return(<div
     style={{
         ...freshDealSideContainer(size)
     }}
    >
        <GameThumbnail 
         addStyle={{
             ...thumbnailStyle()
         }}
         deal={props.deal}
        />
        <div
         style={{
             ...gameInfoContainer(size)
         }}
        >
            <p
             style={{
                 ...textStyle(size),
                 ...{
                     color: '#BAC165',
                     whiteSpace: 'nowrap',
                     overflow: 'hidden',
                     textOverflow: 'ellipsis'
                 }
             }}
            >
                {props.deal.title}
            </p>
            <div
             style={{
                 ...gameInfoBottomRow(size)
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
                     ...priceInfo(size)
                 }}
                >
                    <p
                     style={{
                         ...textStyle(size),
                         ...{
                             color: 'white',
                             textDecoration: 'line-through',
                             marginRight: '0.2em'
                         }
                     }}
                    >
                        {props.deal.normalPrice}
                    </p>
                    <p
                     style={{
                         ...textStyle(size),
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
        <div
         style={{
             ...storeMenuContainer(size)
         }}
        >
            <p
             style={{
                 ...textStyle(size),
                 ...{
                     color: 'black',
                     textShadow: globalConstants.shadowSettings
                 }
             }}
            >
                Get it on
            </p>
            <StoreLogo 
             id={props.deal.storeID}
            />
        </div>
        <div
         style={{
             ...actionContainer(size)
         }}
        >
            <button
             style={{
                 ...actionButton(size)
             }}
            >
                <p
                 style={{
                     ...actionText(size),
                     ...{
                         marginRight: 'auto'
                     }
                 }}
                 onClick={() => {
                    window.open("https://www.cheapshark.com/redirect?dealID=" + props.deal.dealID);
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
    </div>)
}

let freshDealSideContainer = size => {
    return({
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    });
}
let imageContainer = (size) => {
    
    return({
        width: '100%',
        paddingTop: '46.739130434%',
        display: 'flex',
        position: 'relative',
        backgroundColor: '##112123',
        textShadow: globalConstants.shadowSettings
    })
}
let dealImage = (size) => {

    return({
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        maxHeight: '100%',
        margin: 'auto',
        zIndex: 0,
        borderRadius: globalConstants.thumbnailBorderRadius
    });
}
let gameInfoContainer = size => {

    return({
        backgroundColor: '#112123',
        borderRadius: globalConstants.thumbnailBorderRadius,
        padding: '0.25rem',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '0.2em',
        textShadow: globalConstants.shadowSettings
    });
}
let textStyle = size => {
    
    return({
        margin: 0,
        fontSize: '1em'
    })
}
let gameInfoBottomRow = size => {

    return({
        display: 'flex',
        marginTop: '0.2em'
    });
}
let percentOff = size => {

    return({
        display: 'flex',
        backgroundColor: '#DA0A18',
        color: 'white',
        borderRadius: globalConstants.thumbnailBorderRadius,
        width: 'fit-content',
        paddingLeft: '0.2em',
        paddingRight: '0.2em'
    })
}
let percentOffText = size => {

    return({
        margin: 'auto'
    });
}
let priceInfo = size => {
    return({
        display: 'flex',
        marginLeft: '1em'
    })
}

let storeMenuContainer = size => {
    return({
        width: '100%',
        display: 'flex',
        marginTop: '0.2em'
    });
}

let storeLogoContainer = size => {


    return({
        maxHeight: '1.5em',
        display: 'flex',
        backgroundColor: '#278D8A',
        borderRadius: globalConstants.thumbnailBorderRadius
    });
}
let storeImage = size => {

    return({
        madWidth: '6em',
        maxHeight: '1.5em',
        padding: '0.25em',
        margin: 'auto'
    });
}
let actionContainer = size => {

    return({
        width: '100%',
        display: 'flex',
        marginTop: '0.2em'
    });
}
let actionButton = size => {

    return({
        width: '48.5%',
        outline: 'none',
        display: 'flex',
        backgroundColor: '#BAC165',
        border: 'none',
        borderRadius: globalConstants.buttonBorderRadius,
        color: 'black',
        textAlign: 'center',
        height: '1.5rem',
        padding: 0,
        textShadow: globalConstants.shadowSettings
    });
}
let actionText = size => {

    return({
        width: 'fit-content',
        margin: 'auto',
        color: 'black',
        fontSize: '12px',
        width: 'max-content'
    });
}
let getNameCutoffSize = size => {
    if(size === 'extrasmall' || size === 'extralarge' || size === 'large'){
        return 30;
    }
    else{
        return 39;
    }
}
let thumbnailStyle = () => {
    return({
        width: '100%'
    })
}