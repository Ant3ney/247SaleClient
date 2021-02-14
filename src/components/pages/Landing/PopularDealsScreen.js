import React, { useContext } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import PopularDealsContainer from './PopularDealsContainer';

export default function PopularDealsScreen(){
    const bodyMargin = useContext(GlobalContext).bodyXMargin;
    const size = useContext(GlobalContext).size;

    return(<div>
        <div
         style={{
             ...transitionBlock
         }}
        >
        </div>
        <p
         style={{
             ...popularDealsText(size, bodyMargin)
         }}
        >
            Popular deals
        </p>
         <PopularDealsContainer />
    </div>)
}

let transitionBlock = {
    width: '100%',
    height: '2em',
    backgroundColor: '#278D8A'
}
let popularDealsText = (size, bodyMargin) => {
    let fontSize;
    if(size === 'small'){
        fontSize = '1.8em';
    }
    else{
        fontSize = '2.25em'
    }
    
    return({
        paddingLeft: (bodyMargin + 'rem'),
        paddingRight: (bodyMargin + 'rem'),
        fontSize: fontSize,
        marginTop: '2.25rem'
    });
}