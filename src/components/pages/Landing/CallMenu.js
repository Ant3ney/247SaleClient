import React, { useContext } from 'react';
import globalCostants from '../../../utilities/GlobalConstants';
import { GlobalContext } from '../../../utilities/GlobalContext';

export default function CallMenu(){
    const size = useContext(GlobalContext).size;

    return(<div
     style={{
         ...callMenuStyle
     }}
    >
        <h1 
         style={{
             ...titleStyle(size)
        }}
        >
            Its always a steam sale here
        </h1>
        <p 
        style={{
            ...subTitleStyle(size)
         }}
        >
            Video game deal data from every major online retailer.
        </p>
        <div 
         className="row"
         style={{
             ...callButtonRowStyle(size)
         }}
        >
            <button 
             className="col-6"
             style={{
                 ...callButtonStyle(size),
                 ...{
                     marginRight: 'auto',
                     backgroundColor: '#278D8A'
                 }
             }}
            >
                Brous Deals
            </button>
            <button 
             className="col-6"
             style={{
                ...callButtonStyle(size),
                ...{
                    marginLeft: 'auto',
                    backgroundColor: '#FCD399',
                    color: '#DA0A18'
                }
             }}
            >
                Get alerts
            </button>
        </div>
        <p 
         style={{
            ...creditStyle(size)
         }}
        >Powered by cheapshark.com</p>
    </div>);
}
let callMenuStyle={
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%'
}
let titleStyle = (size) => {
    let fontSize;
    if(size == 'small' || size == 'wide'){
        fontSize='2em'
    }
    else{
        fontSize='3.5em'
    }

    return({
        fontFamily: "SHOWG",
        color: 'white',
        marginBottom: 0,
        fontSize: fontSize
    });
}
let subTitleStyle = (size) => {
    let marginTop;
    let fontSize;
    if(size == 'small' || size == 'wide'){
        marginTop = '1em';
        fontSize = '0.75em';
    }
    else{
        marginTop = '2em';
        fontSize = '1em';
    }
    
    return({
        fontFamily: 'Segoe UI',
        color: 'white',
        marginTop: marginTop,
        marginBottom: 0,
        fontSize: fontSize
    });
}
let callButtonRowStyle= (size) => {
    let marginTop;
    if(size == 'small' || size == 'wide'){
        marginTop = '0.5em'
    }
    else{
        marginTop = '1em'
    }

    return({
        width: "100%",
        margin: 0,
        display: 'flex',
        marginTop: marginTop
    });
}
let callButtonStyle = (size) => {
    let padding;
    if(size == 'small' || size == 'wide'){
        padding = '0.37em';
    }
    else{
        padding = '.75em';
    }

    return({
        borderRadius: globalCostants.buttonBorderRadius,
        border: 0,
        width: '48.5%',
        padding: padding
    });
}
let creditStyle = (size) => {
    let marginTop;
    let fontSize;
    if(size == 'small' || size == 'wide'){
        marginTop = '0.5em';
        fontSize = '0.5em';
    }
    else{
        marginTop = '1em'
        fontSize = '1em';
    }

    return({
        fontFamily: 'Segoe UI',
        color: 'white',
        marginTop: marginTop,
        marginBottom: 0,
        fontSize: fontSize
    });
}