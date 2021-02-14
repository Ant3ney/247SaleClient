import React, { useContext } from 'react';
import { GlobalContext } from '../utilities/GlobalContext';
import GlobalConstants from '../utilities/GlobalConstants';

export default function StoreLogo(props){
    const size = useContext(GlobalContext).size;
    let variant = props.variant;
    let storeFileName = getStringFromId(props.id)

    return(<div
     style={{
         ...StoreImageContainer(size, variant)
     }}
    >
        <img 
         style={{
             ...storeImage(size, props),
             ...{
                
             }
         }}
         src={'https://serene-williams-bb8bee.netlify.app/images/GameStoreLogos/' + storeFileName}
         alt='Store Logo'
        ></img>
    </div>)
}

let StoreImageContainer = (size, variant) => {
    let marginRight;
    if(variant === 'freshlandscape'){
        marginRight = '0.4em';
    }
    else{
        marginRight = 'unset';
    }
    return({
        display: 'flex',
        backgroundColor: '#278D8A',
        borderRadius: GlobalConstants.buttonBorderRadius,
        marginTop: 'auto',
        marginBottom: 'auto',
        height: '90%',
        marginRight: marginRight
    });
}

let storeImage = (size, props) => {
    let maxHeight;
    let maxWidth;
    let padding;
    if(size === 'extrasmall'){
        maxHeight = '1em';
        padding = '0.12em';
        maxWidth = '61px';
    }
    else{
        maxHeight = '1.5em';
        maxWidth = '83px';
        padding = '0.25em';
    }
    if(props.maxHeight){
        maxHeight = props.maxHeight;
    }

    return({
        madWidth: '6em',
        maxHeight: maxHeight,
        padding: padding,
        margin: 'auto',
        maxWidth: maxWidth
    });
}

function getStringFromId(id){
    switch(id){
        case '1': return('Steam.svg');
        case '2': return('GamersGate.png');
        case '3': return('GreenManGaming.png');
        case '4': return('Amazon.png');
        case '5': return('GameStop.png');
        case '6': return('Direct2Drive.png');
        case '7': return('GOG.png');
        case '8': return('Origin.png');
        case '9': return('Get Games.png');
        case '10': return('Shiny Loot.png');
        case '11': return('Humble Store.png');
        case '12': return('Desura.png');
        case '13': return('Uplay.png');
        case '14': return('IndieGameStand.png');
        case '15': return('Fanatical.png');
        case '16': return('Gamesrocket.png');
        case '17': return('Games Republic.png');
        case '18': return('SilaGames.png');
        case '19': return('Playfield.png');
        case '20': return('ImperialGames.png');
        case '21': return('WinGameStore.png');
        case '22': return('FunStockDigital.png');
        case '23': return('GameBillet.png');
        case '24': return('Voidu.png');
        case '25': return('Epic Games Store.png');
        case '26': return('Razer Game Store.png');
        case '27': return('Gamesplanet.png');
        case '28': return('Gamesload.png');
        case '29': return('2Game.png');
        case '30': return('IndieGala.png');
        case '31': return('Blizzard Shop.png')
        case '32': return('AllYouPlay.png');
        default: console.error('Invalid store id supplied'); return('error');
    }
}