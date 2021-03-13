import React, { useEffect, useContext } from 'react';
import StoreLogo from '../../StoreLogo';
import trackGameButton from '../../../utilities/trackDealButton';
import globalCostants from '../../../utilities/GlobalConstants';
import { GlobalContext } from '../../../utilities/GlobalContext';
import TrackGame from '../../Deal/TrackGame';

export default function BigFeatured(props){
    useEffect(() => {
        
    }, []);
    const size = useContext(GlobalContext).size;
    const user = useContext(GlobalContext).user;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;
    const setTrackedDeal = useContext(GlobalContext).setTrackedDeal;
    let deal = props.deal.gameInfo;
    if(!deal){
        return(<>Loading</>);
    }
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
             src={props.deal.picture}
             style={{
                ...featuredImage
             }}
             alt='Featured game'
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
                    {deal.name}
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
                        {`$${deal.retailPrice}`}
                    </p>
                    <p
                     style={{
                         ...infoText(size),
                         marginLeft: '0.3em'
                     }}
                    >
                        {`$${deal.salePrice}`}
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
                            {getPercentOff(deal.retailPrice, deal.salePrice)}
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
                    <StoreLogo 
                     id={deal.storeID}
                    />
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
             onClick={() => {
                window.open("https://www.cheapshark.com/redirect?dealID=" + props.deal.dealID);
             }}
            >
                Visit Store
            </button>
            <TrackGame
             deal={getFormatedDealOf(props.deal)}
            />
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
    if(size === 'small' || size === 'extrasmall'){
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
    if(size === 'small' || size === 'wide' || size === 'extrasmall'){
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
    if(size === 'small' || size === 'wide' || size === 'extrasmall'){
        fontSize = '0.75em';
    }
    else if(size === 'medium'){
        fontSize = '1em';
    }
    else{
        fontSize = '1.2em';
    }

    return({
        color: '#BAC165',
        padding: 0,
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: fontSize,
        height: 'fit-content'
    });
}
let percentOff={
    color: 'white',
    backgroundColor: '#DA0A18',
    margin: 0,
    borderRadius: globalCostants.thumbnailBorderRadius,
    padding: '0.2em',
    paddingTop: '0.1em',
    paddingBottom: '0.1em'
}
let percentOffText = (size) => {
    let fontSize;
    if(size === 'small' || size === 'wide' || size === 'extrasmall'){
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
    if(size === 'small' || size === 'wide' || size === 'extrasmall'){
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
    if(size === 'small' || size === 'wide' || size === 'extrasmall'){
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
let getPercentOff = (normal, sale) => {
    if(normal <= 0){
        return('-100%');
    }
    let decimal = (sale / normal);
    if(decimal === 0){
        return('-100%');
    }
    return('-' + (decimal * 100 + '').split('.')[0] + '%')
}
let getFormatedDealOf = (featuredDeal) => {
    let innerDeal = featuredDeal.gameInfo;
    let newDeal = {
        internalName: innerDeal.internalName,
        featuredDeal: innerDeal.retailPrice,
        salePrice: innerDeal.salePrice,
        thumb: featuredDeal.picture,
        storeID: innerDeal.storeID,
        dealID: featuredDeal.dealID
    }

    return newDeal;
}