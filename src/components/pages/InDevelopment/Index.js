import React, { useContext } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import GlobalConstants from '../../../utilities/GlobalConstants';

export default function InDevelopment(){
    const bodyXPadding = useContext(GlobalContext).bodyXMargin;
    const size = useContext(GlobalContext).size;

    return(
        <div
         style={{
             ...inDevelopmentContainer(size, bodyXPadding)
         }}
        >
            <h1
             style={{
                 ...inDevelopmentTitle(size)
             }}
            >
                Feature in development
            </h1>
            <p
             style={{
                 ...inDevelopmentSubTitle(size)
             }}
            >
                The feature you requested is currently being worked on. Please be patient as its just one person working on this site
            </p>
        </div>
    );
}

let inDevelopmentContainer = (size, bodyXPadding) => {
    let paddingX;
    if(size === 'extrasmall'){
        paddingX = '1rem';
    }
    else{
        paddingX = bodyXPadding + 'rem';
    }

    return({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#278D8A',
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: '6rem',
        height: '100vh'
    });
}
let inDevelopmentTitle = size => {
    let fontSize;
    if(size === 'extrasmall'){
        fontSize = '2.5em';
    }
    else if(size === 'wide'){
        fontSize = '3em';
    }
    else{
        fontSize = '3.5em';
    }
    return({
        fontSize: fontSize,
        fontFamily: 'SHOWG',
        width: '100%',
        textAlign: 'center',
        color: 'white'
    });
}
let inDevelopmentSubTitle = size => {

    return({
        color: 'white',
        textAlign: 'center'
    });
}