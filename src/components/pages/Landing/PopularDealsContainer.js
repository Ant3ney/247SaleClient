import React, { useContext } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import PopularDealContainer from './PopularDealContainer';

export default function PopularDealsContainer(){
    const bodyMargin = useContext(GlobalContext).bodyXMargin;
    const size = useContext(GlobalContext).size;

    return(<div
     style={{
         ...popularDealsContainerStyle(size, bodyMargin)
     }}
    >
        <div
         className="row"
        >
            <div
             className="col-sm-6 col-lg-3"
             style={{
                ...dealContainer(size)
             }}
            >
                <PopularDealContainer />
            </div>
            <div
             className="col-sm-6 col-lg-3 mt-4 mt-sm-0 mt-lg-0"
             style={{
                ...dealContainer(size)
             }}
            >
                <PopularDealContainer />
            </div>
            <div
             className="col-sm-6 col-lg-3 mt-4 mt-lg-0"
             style={{
                ...dealContainer(size)
             }}
            >
                <PopularDealContainer />
            </div>
            <div
             className="col-sm-6 col-lg-3 mt-4 mt-lg-0"
             style={{
                ...dealContainer(size)
             }}
            >
                <PopularDealContainer />
            </div>
        </div>
    </div>)
}

let popularDealsContainerStyle = (size, bodyMargin) => {
    let fontSize;
    if(size == 'small'){
        
    }
    return({
        paddingLeft: bodyMargin + 'rem',
        paddingRight: bodyMargin + 'rem',
        marginTop: '2.25rem',
        marginBottom: '4.5rem'
    });
}
let dealContainer = (size) => {
    return({
        color: 'white',
    });
}