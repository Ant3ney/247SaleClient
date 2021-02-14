import React, { useContext } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import FreshDealLandscape from './FreshDealLandscape';
import FreshDealSide from './FreshDealSide';

export default function FreshDealTrio(props){
    const size = useContext(GlobalContext).size;
    if(!props.deals){
        return(<>Loading</>)
    }
    return(<div
     className='row removeGutterX'
     style={{
        ...freashDealTrioContainer(size, props)
     }}
    >
        <div
         className='col-xl-9'
         style={{
             ...mainFreashDealLandscapeContainers(size)
         }}
        >
            <FreshDealLandscape
             deal={props.deals[0]} 
             top={true}
            />
            <FreshDealLandscape 
             deal={props.deals[1]} 
             middle={true}
            />
            {size !== 'extralarge' ? 
                <FreshDealLandscape
                 deal={props.deals[2]}  
                 bottom={true}
                /> : <></>}
        </div>
        {size === 'extralarge' ? <div
         className='col-xl-3'
         style={{
             ...freashDealSideContainer(size)
         }}
        >
            <FreshDealSide 
             deal={props.deals[2]} 
             bottom={true}
            /> 
        </div>: <></>}
        
    </div>)
}

let freashDealTrioContainer = (size, props) => {
    let marginTop;
    if(!props.top){
        if(size !== 'extrasmall'){
            marginTop = '2rem';
        }
        else{
            marginTop = '1rem';
        }
        
    }
    else{
        marginTop = '0rem';
    }

    return({
        width: '100%',
        display: 'flex',
        marginTop: marginTop
    });
}

let mainFreashDealLandscapeContainers = size => {

    return({
        display: 'flex',
        flexDirection: 'column'
    });
}
let freashDealSideContainer = size => {

    return({
        display: 'flex'
    })
}