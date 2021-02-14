import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import GlobalConstants from '../../../utilities/GlobalConstants';
import GameThumbnail from '../../GameThumbnail';
import StoreLogo from '../../StoreLogo';

export default function SelectedGameContainer(){
    const size = useContext(GlobalContext).size;
    const freshDeals = useContext(GlobalContext).freshDeals;
    const trackedDeal = useContext(GlobalContext).trackedDeal

    const [targetPrice, setTargetPrice] = useState(null);

    let dealName = trackedDeal.internalName;
    if(dealName && dealName.length > (getNameCutoffSize(size) + 3)){
        dealName =  dealName = dealName.substr(0, getNameCutoffSize(size)) + "\u2026";
    }

    let marginTop;
    let fontSize;
    let labelFontSize;
    let maxHeight;
    if(size === 'wide'){
        marginTop = 0;
        fontSize = '12px';
        labelFontSize = '10px';
        maxHeight = '1em';
    }
    else{
        marginTop = '0.4rem';
        fontSize = '25px';
        labelFontSize = '16px'
        maxHeight = '1.5em';
    }

    if(!trackedDeal){
        return('Loading');
    }

    return(<div
     style={{
         ...selectedGameContainer(size)
     }}
    >
        <GameThumbnail 
         deal={trackedDeal}
         addStyle={addThumbnailStyle(size)}
        />
        <p
         style={{
             ...text(size),
             ...{
                 color: '#BAC165',
                 fontSize: fontSize,
                 marginTop: marginTop
             }
         }}
        >
            {dealName}
        </p>
        <div
         style={{
             ...priceInfoContainer(size)
         }}
        >
            <div
             style={{
                 ...percentOffContainer(size)
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
            <div
             style={{
                 ...pricesContainer(size)
             }}
            >
                <p
                 style={{
                     ...text(size),
                     ...{
                         color: 'white',
                         textDecoration: 'line-through',
                         fontSize: fontSize,
                         marginRight: '0.4rem'
                     }
                 }}
                >
                    {trackedDeal.normalPrice}
                </p>
                <p
                 style={{
                     ...text(size),
                     ...{
                         color: '#BAC165',
                         fontSize: fontSize
                     }
                 }}
                >
                    {trackedDeal.salePrice}
                </p>
            </div>
        </div>
        <div
         style={{
             ...storeInfoContainer(size)
         }}
        >
            <p
             style={{
                 ...text(size),
                 ...{
                     color: '#BAC165',
                     fontSize: fontSize,
                     marginRight: '0.4rem'
                 }
             }}
            >
                Get it on
            </p>
            <StoreLogo 
             id={trackedDeal.storeID}
             maxHeight={maxHeight}
            />
        </div>
        <button
         style={{
             ...actionButton(size),
             ...{ 
                width: '100%',
                marginTop: marginTop,
                fontSize: fontSize
             }
         }}
        >
            Visit Store
        </button>
        <p
         style={{
             ...text(size),
             ...{
                 color: 'white',
                 marginTop: marginTop,
                 fontSize: labelFontSize
             }
         }}
        >
            Email me when price drops down to
        </p>
        <div
         style={{
             ...priceInputContainer(size)
         }}
        >
            <p
             style={{
                 ...text(size),
                 ...{
                     color: 'white',
                     fontSize: fontSize
                 }
             }}
            >
                $
            </p>
            <input 
             id='priceInput' 
             name="price"
             className='input'
             type='number'
             onChange={(event) => {setTargetPrice(event.target.value)}}
             style={{
                 ...priceInput(size)
             }}
             placeholder="10"
            >
            </input>
            <button
             style={{
                 ...actionButton(size),
                 ...{ 
                    width: '100%',
                    fontSize: fontSize
                 }
             }}
            >
                Track price
            </button>
        </div>
    </div>);
}

let selectedGameContainer = size => {
    let width;
    if(size === 'extrasmall'){
        width = '100%';
    }
    else if(size === 'extralarge'){
        width = '30%';
    }
    else{
        width = '40%';
    }

    return({
        marginLeft: 'auto',
        marginRight: 'auto',
        width: width,
        padding: '10px',
        backgroundColor: '#112123',
        borderRadius: GlobalConstants.buttonBorderRadius
    });
}

let addThumbnailStyle = size => {

    return({
        width: '100%'
    })
}
let text = size => {

    return({
        margin: 0
    })
}
let priceInfoContainer = size => {
    let marginTop;
    if(size === 'wide'){
        marginTop = 0;
    }
    else{
        marginTop = '0.4rem';
    }
    return({
        display: 'flex',
        marginTop: marginTop
    })
}
let percentOffContainer = size => {
    let padding;
    if(size == 'wide'){
        padding = '0.12rem';
    }
    else{
        padding = '0.25rem';
    }

    return({
        padding: padding,
        backgroundColor: '#DA0A18',
        borderRadius: GlobalConstants.buttonBorderRadius
    })
}
let percentOffText = size => {
    let fontSize;
    if(size === 'wide'){
        fontSize = '15px';
    }
    else{
        fontSize = '30px';
    }

    return({
        color: 'white',
        fontSize: fontSize,
        margin: 0
    })
}
let pricesContainer = size => {

    return({
        display: 'flex',
        marginLeft: 'auto'
    })
}
let storeInfoContainer = size => {

    return({
        display: 'flex',

    })
}
let actionButton = size => {
    let fontSize;
    let maxHeight;
    let padding;
    if(size === 'wide'){
        fontSize = '11px';
        maxHeight = '1rem';
        padding = 0;
    }
    else{
        fontSize = 'unset';
        maxHeight = 'unset';
        padding = '0.35em';
    }

    return({
        border: 0,
        padding: padding,
        backgroundColor: '#BAC165',
        borderRadius: GlobalConstants.buttonBorderRadius,
        outline: 'none',
        fontSize: fontSize,
        maxHeight: maxHeight
    });
}
let priceInputContainer = size => {
    let marginTop;
    if(size === 'wide'){
        marginTop = 0;
    }
    else{
        marginTop = '0.4rem';
    }

    return({
        display: 'flex',
        marginTop: marginTop
    })
}
let priceInput = size => {
    let maxHeight;
    

    if(size === 'wide'){
        maxHeight = '1rem';
    }
    else{
        maxHeight = 'unset';
    }

    return({
        outline: 'none',
        border: 0,
        color: 'white',
        backgroundColor: '#278D8A',
        paddingLeft: '0.5em',
        paddingRight: '0.5em',
        borderRadius: '5px',
        width: '30%',
        marginLeft: '0.4rem',
        marginRight: '0.4rem',
        maxHeight: maxHeight
    });
}
let getNameCutoffSize = size => {
    if(size === 'extralarge' || size === 'large'){
        return 22;
    }
    else if(size === 'extrasmall'){
        return 17;
    }
    else{
        return 20;
    }
}