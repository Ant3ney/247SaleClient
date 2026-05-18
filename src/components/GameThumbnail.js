import React, { useState, useContext } from 'react';
import { GlobalContext } from '../utilities/GlobalContext';
import GlobalConstants from '../utilities/GlobalConstants';

export default function GameThumbnail(props){
    const [orientation, setOrientation] = useState('horizontal');
    const size = useContext(GlobalContext).size;

    return(<div
        style={{
            ...freshDealImageContainer(size),
            ...props.addStyle
        }}
       >
           <div
            style={{
                ...freshDealImageBackground(size),
                ...{
                    borderRadius: props.borderRadius ? props.borderRadius : 'unset'
                }
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
       </div>);
}

let freshDealImageContainer = size => {

    return({
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