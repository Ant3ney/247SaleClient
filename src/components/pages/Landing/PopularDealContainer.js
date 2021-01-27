import React, { useContext } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import globalCostants from '../../../utilities/GlobalConstants';

export default function PopularDealContainer(){
    const size = useContext(GlobalContext).size;

    return(<div
     style={{
        ...popularDealContainerStyle(size)
     }}
    >
        <div
         style={{
            ...imageContainer(size)
         }}
        >
            <img 
             src={process.env.PUBLIC_URL + 'RustImage.jpg'}
             style={{
                ...dealImage(size)
             }}
            >
            </img>
        </div>
        <div
         style={{
            ...gameInfoContainer(size)
         }}
        >
            <div
             style={{
                 ...gameInfoRow(size),
                 ...{
                     marginBottom: '0.12em'
                 }
             }}
            >
                <p
                 style={{
                    ...gameInfoText(size),
                    ...{
                        color: '#BAC165'
                    }
                 }}
                >
                    Rust: The complete edition
                </p>
            </div>
            <div
             style={{
                 ...gameInfoRow(size)
             }}
            >
                <div
                 style={{
                    ...bottomSize(size),
                    ...{
                        marginRight: 'auto'
                    }
                 }}
                >
                    <div
                     style={{
                        ...percentOffContainer(size)
                     }}
                    >
                        <p
                         style={{
                            ...gameInfoText(size),
                            ...{
                                color: 'white'
                            }
                         }}
                        >
                            -33%
                        </p>
                    </div>
                </div>
                <div
                 style={{
                    ...bottomSize(size)
                 }}
                >
                    <p
                     style={{
                        ...gameInfoText(size),
                        ...{
                            color: 'white',
                            textDecoration: 'line-through'
                        }
                     }}
                    >
                        $29.99
                    </p>
                    <p
                     style={{
                        ...gameInfoText(size),
                        ...{
                            color: '#BAC165',
                            marginLeft: '0.25em'
                        }
                     }}
                    >
                        $9.99
                    </p>
                </div>
            </div>
        </div>
        <div
         style={{
            ...storeInfoContainer(size)
         }}
        >
            <p
             style={{
                ...storeGetItOn(size)
             }}
            >
                Get it on
            </p>
            <div
             style={{
                ...storeImageContainer(size),
                ...{
                    marginLeft: '0.25em'
                }
             }}
            >
                <img 
                 style={{
                     ...storeImage(size),
                     ...{

                     }
                 }}
                 src={process.env.PUBLIC_URL + 'GreenManLogo.png'}
                ></img>
            </div>
        </div>
        <div
         style={{
            ...dealActionContainer(size)
         }}
        >
            <button
             style={{
                 ...actionButton(size),
                 ...{
                     marginRight: 'auto'
                 }
             }}
            >
                Visit Store
            </button>
            <button
             style={{
                 ...actionButton(size),
                 ...{
                     marginLeft: 'auto'
                 }
             }}
            >
                Track Game
            </button>
        </div>
    </div>)
}

let popularDealContainerStyle = (size) => {

    return({
        width: '100%'
    })
}
let imageContainer = (size) => {
    
    return({
        width: '100%',
        paddingTop: '46.739130434%',
        display: 'flex',
        position: 'relative',
        backgroundColor: '##112123'
    })
}
let dealImage = (size) => {

    return({
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
    });
}
let gameInfoContainer = (size) => {

    return({
        backgroundColor: '#112123',
        borderRadius: globalCostants.thumbnailBorderRadius,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '0.25em',
        paddingLeft: '0.35em',
        paddingRight: '0.35em',
        paddingBottom: '0.35em',
        paddingTop: '0.12em'
    });
}
let gameInfoRow = (size) => {

    return({
        width: '100%',
        display: 'flex'
    });
}
let gameInfoText = (size) => {
    let fontSize
    if(size == 'small'){
        fontSize = '0.75em';
    }
    else{
        fontSize = '1em';
    }
    return({
        fontSize: fontSize,
        height: 'fit-content',
        marginTop: 0,
        marginBottom: 0
    });
}
let bottomSize = (size) => {

    return({
        display: 'flex'
    });
}
let percentOffContainer = (size) => {

    return({
        padding: '0.1em 0.2em',
        backgroundColor: 'red',
        borderRadius: globalCostants.thumbnailBorderRadius,
        display: 'flex'
    });
}
let storeInfoContainer = size => {

    return({
        width: '100%',
        display: 'flex',
        marginTop: '0.25em'
    });
}
let storeGetItOn = size => {

    return({
        color: 'black',
        marginBottom: 0
    });
}
let storeImageContainer = (size) => {
    
    return({
        backgroundColor: '#278D8A',
        borderRadius: globalCostants.thumbnailBorderRadius,
        display: 'flex'
    });
}
let storeImage = (size) => {
    let maxHeight;
    if(size == 'small'){
        maxHeight = '1.5em'
    }
    else{
        maxHeight = '1.5em'
    }

    return({
        madWidth: '6em',
        maxHeight: maxHeight,
        padding: '0.25em',
        margin: 'auto'
    });
}
let dealActionContainer = size => {

    return({
        display: 'flex',
        width: '100%',
        marginTop: '0.25em'
    })
}
let actionButton = size => {

    return({
        padding: '0.25em',
        width: '49%',
        backgroundColor: '#BAC165',
        border: 0,
        borderRadius: globalCostants.buttonBorderRadius
    })
}