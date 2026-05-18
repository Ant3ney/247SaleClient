import React, { useContext } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import PopularDealContainer from './PopularDealContainer';

export default function PopularDealsContainer(){
    const bodyMargin = useContext(GlobalContext).bodyXMargin;
    const size = useContext(GlobalContext).size;
    const popularDeals = useContext(GlobalContext).popularDeals;

    let popularDeal01 = null;
    let popularDeal02 = null;
    let popularDeal03 = null;
    let popularDeal04 = null;
    if(popularDeals != null){
        popularDeal01 = popularDeals[0];
        popularDeal02 = popularDeals[1];
        popularDeal03 = popularDeals[2];
        popularDeal04 = popularDeals[3];
    }

    if(!popularDeals){
        return('Loading');
    }

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
                <PopularDealContainer 
                 deal={popularDeal01}
                />
            </div>
            <div
             className="col-sm-6 col-lg-3 mt-4 mt-sm-0 mt-lg-0"
             style={{
                ...dealContainer(size)
             }}
            >
                <PopularDealContainer 
                 deal={popularDeal02}
                />
            </div>
            <div
             className="col-sm-6 col-lg-3 mt-4 mt-lg-0"
             style={{
                ...dealContainer(size)
             }}
            >
                <PopularDealContainer 
                 deal={popularDeal03}
                />
            </div>
            <div
             className="col-sm-6 col-lg-3 mt-4 mt-lg-0"
             style={{
                ...dealContainer(size)
             }}
            >
                <PopularDealContainer 
                 deal={popularDeal04}
                />
            </div>
        </div>
    </div>)
}

let popularDealsContainerStyle = (size, bodyMargin) => {
    if(size === 'small'){
        
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