import React, { useContext } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import globalCostants from '../../../utilities/GlobalConstants';
import GameThumbnail from '../../GameThumbnail';
import StoreLogo from '../../StoreLogo';

export default function PopularDealContainer(props){
    const size = useContext(GlobalContext).size;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;
    const setTrackedDeal = useContext(GlobalContext).setTrackedDeal;
    let dealName = props.deal.internalName;
    if(dealName.length > (getNameCutoffSize(size) + 3)){
        dealName =  dealName = dealName.substr(0, getNameCutoffSize(size)) + "\u2026";
    }

    return(<div
     style={{
        ...popularDealContainerStyle(size)
     }}
    >
        <GameThumbnail 
         deal={props.deal}
         borderRadius={globalCostants.buttonBorderRadius}
         addStyle={{
             ...addThumbnailStyle(size)
         }}
        />
        <div
         style={{
            ...gameInfoContainer(size)
         }}
        >
            <div
             style={{
                 ...gameInfoRow(size),
                 ...{
                     marginBottom: '0.12em'
                 }
             }}
            >
                <p
                 style={{
                    ...gameInfoText(size),
                    ...{
                        color: '#BAC165'
                    }
                 }}
                >
                    {dealName}
                </p>
            </div>
            <div
             style={{
                 ...gameInfoRow(size)
             }}
            >
                <div
                 style={{
                    ...bottomSize(size),
                    ...{
                        marginRight: 'auto'
                    }
                 }}
                >
                    <div
                     style={{
                        ...percentOffContainer(size)
                     }}
                    >
                        <p
                         style={{
                            ...gameInfoText(size),
                            ...{
                                color: 'white'
                            }
                         }}
                        >
                            {'-' + props.deal.savings.split('.')[0] + '%'}
                        </p>
                    </div>
                </div>
                <div
                 style={{
                    ...bottomSize(size)
                 }}
                >
                    <p
                     style={{
                        ...gameInfoText(size),
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
                        ...gameInfoText(size),
                        ...{
                            color: '#BAC165',
                            marginLeft: '0.25em'
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
            ...storeInfoContainer(size)
         }}
        >
            <p
             style={{
                ...storeGetItOn(size)
             }}
            >
                Get it on
            </p>
            <StoreLogo 
             id={props.deal.storeID}
             maxHeight={'1.5em'}
            />
        </div>
        <div
         style={{
            ...dealActionContainer(size)
         }}
        >
            <button
             style={{
                 ...actionButton(size),
                 ...{
                     marginRight: 'auto'
                 }
             }}
             onClick={() => {
                window.open("https://www.cheapshark.com/redirect?dealID=" + props.deal.dealID);
             }}
            >
                Visit Store
            </button>
            <button
             style={{
                 ...actionButton(size),
                 ...{
                     marginLeft: 'auto'
                 }
             }}
             onClick={() => {
                setTrackedDeal(props.deal);
                setCurrentNav('TrackGame');
             }}
            >
                Track Game
            </button>
        </div>
    </div>)
}

let popularDealContainerStyle = (size) => {

    return({
        width: '100%'
    })
}
let addThumbnailStyle = size => {

    return({
        width: '100%',
        borderRadius: globalCostants.buttonBorderRadius
    })
}
let imageContainer = (size) => {
    
    return({
        width: '100%',
        paddingTop: '46.739130434%',
        display: 'flex',
        position: 'relative',
        backgroundColor: '##112123'
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
        borderRadius: globalCostants.thumbnailBorderRadius
    });
}
let gameInfoContainer = (size) => {

    return({
        backgroundColor: '#112123',
        borderRadius: globalCostants.thumbnailBorderRadius,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '0.25em',
        paddingLeft: '0.35em',
        paddingRight: '0.35em',
        paddingBottom: '0.35em',
        paddingTop: '0.12em'
    });
}
let gameInfoRow = (size) => {

    return({
        width: '100%',
        display: 'flex'
    });
}
let gameInfoText = (size) => {
    let fontSize
    if(size === 'small'){
        fontSize = '0.75em';
    }
    else{
        fontSize = '1em';
    }
    return({
        fontSize: fontSize,
        height: 'fit-content',
        marginTop: 0,
        marginBottom: 0
    });
}
let bottomSize = (size) => {

    return({
        display: 'flex'
    });
}
let percentOffContainer = (size) => {

    return({
        padding: '0.1em 0.2em',
        backgroundColor: 'red',
        borderRadius: globalCostants.thumbnailBorderRadius,
        display: 'flex'
    });
}
let storeInfoContainer = size => {

    return({
        width: '100%',
        display: 'flex',
        marginTop: '0.25em'
    });
}
let storeGetItOn = size => {

    return({
        color: 'black',
        marginBottom: 0
    });
}
let storeImageContainer = (size) => {
    
    return({
        backgroundColor: '#278D8A',
        borderRadius: globalCostants.thumbnailBorderRadius,
        display: 'flex'
    });
}
let storeImage = (size) => {
    let maxHeight;
    if(size === 'small'){
        maxHeight = '1.5em'
    }
    else{
        maxHeight = '1.5em'
    }

    return({
        madWidth: '6em',
        maxHeight: maxHeight,
        padding: '0.25em',
        margin: 'auto'
    });
}
let dealActionContainer = size => {

    return({
        display: 'flex',
        width: '100%',
        marginTop: '0.25em'
    })
}
let actionButton = size => {

    return({
        padding: '0.25em',
        width: '49%',
        backgroundColor: '#BAC165',
        border: 0,
        borderRadius: globalCostants.buttonBorderRadius
    })
}
let getNameCutoffSize = size => {
    if(size === 'extrasmall' || size === 'extralarge' || size === 'large'){
        return 20;
    }
    else{
        return 39;
    }
}