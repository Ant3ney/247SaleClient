import React, { useContext } from 'react';
import  { GlobalContext }  from '../../utilities/GlobalContext';
import globalConstants from '../../utilities/GlobalConstants';

export default function TrackGame(props){
    const size = useContext(GlobalContext).size;
    const user = useContext(GlobalContext).user;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;
    const setTrackedDeal = useContext(GlobalContext).setTrackedDeal;

    return(<button
        style={{
            ...container(size),
            ...{
                marginLeft: 'auto'
            },
            ...props.addStyle
        }}
        onClick={() => {
            onTrack(user, setCurrentNav, setTrackedDeal, props.deal);
        }}
       >
           <span
            style={{...props.addStyleText}}
           >
               Track Game
           </span>
       </button>);
}

let container = (size) => {
    let padding;
    if(size === 'small' || size === 'wide' || size === 'extrasmall'){
        padding = '0.37em';
    }
    else{
        padding = '0.75em';
    }

    return({
        borderRadius: globalConstants.buttonBorderRadius,
        border: 0,
        width: '48.5%',
        padding: padding,
        backgroundColor: '#BAC165'
    });
}

function onTrack(user, navTo, setDeal, deal){
    if(user){
        setDeal(deal);
        navTo('TrackGame');
    }
    else{
        navTo('SignIn');
    }
}