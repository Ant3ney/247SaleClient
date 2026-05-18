import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import SelectedGame from './SelectedGame';

export default function Index(){
    const size = useContext(GlobalContext).size;
    const paddingX = useContext(GlobalContext).bodyXMargin

    return(<div
     style={{
         ...trackGamePageContainer(size, paddingX)
     }}
    >
        <h1
         style={{
             ...trackGameTitle(size)
         }}
        >
            Track new game
        </h1>
        <SelectedGame />
    </div>)
}

let trackGamePageContainer = (size, paddingX) => {
    let paddingTop;
    if(size === 'wide'){
        paddingTop = '12vh';
    }
    else{
        paddingTop = '10vh';
    }

    return({
        paddingTop: paddingTop,
        paddingLeft: paddingX + 'rem',
        paddingRight: paddingX + 'rem',
        width: '100%',
        height: '100vh',
        backgroundColor: '#278D8A',
        display: 'flex',
        flexDirection: 'column'
    })
}
let trackGameTitle = size => {
    let fontSize;
    if(size === 'extrasmall'){
        fontSize = '2em';
    }
    else if(size === 'wide'){
        fontSize = '2em';
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