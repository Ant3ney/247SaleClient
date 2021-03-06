import React, { useContext } from 'react';
import FreshDealsContainer from './FreshDealsContainer';
import { GlobalContext } from '../../../utilities/GlobalContext';
import GlobalConstants from '../../../utilities/GlobalConstants';

export default function HomePage(){
    const bodyXPadding = useContext(GlobalContext).bodyXMargin;
    const size = useContext(GlobalContext).size;

    return(<div
     style={{
         ...homePageContainer(size, bodyXPadding)
     }}
    >
        <div
         style={{
            ...freashDealsTitleContainer(size)
         }}
        >
            <h5
             style={{
                 ...freshDealTitle(size)
             }}
            >
                Fresh Deals
            </h5>
            <p
             style={{
                 ...freshDealSubtitle(size)
             }}
            >
                Quickly brows from over hundreds of video game sales across a verity of online stores
            </p>
        </div>
        <FreshDealsContainer />
    </div>);
}

let homePageContainer = (size, bodyXPadding) => {
    let padding;
    if(size === 'extrasmall'){
        padding = 0 + 'rem'
    }
    else if(size === 'small'){
        padding = 1 + 'rem';
    }
    else{ 
        padding = bodyXPadding + 'rem';
    } 

    return({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#278D8A',
        paddingLeft: padding,
        paddingRight: padding,
        paddingTop: '6rem'
    });
}

let freashDealsTitleContainer = size => {
    let padding;
    if(size === 'extrasmall'){
        padding = '1rem';
    }
    else{
        padding = 0;
    }

    return({
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: padding,
        paddingRight: padding
    });
}

let freshDealTitle = size => {

    return({
        color: 'white',
        fontFamily: 'SHOWG',
        marginBottom: 0,
        fontSize: '2em',
        textShadow: GlobalConstants.shadowSettings
    });
}
let freshDealSubtitle = size => {

    return({
        color: 'white',
        textShadow: GlobalConstants.shadowSettings,
        marginTop: '1rem',
        marginBottom: '1rem'
    })
}