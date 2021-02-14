import React, { useContext } from 'react';
import { GlobalContext } from '../../../utilities/GlobalContext';
import FreshDealTrio from './FreshDealTrio';

export default function FreshDealsContainer(){
    const size = useContext(GlobalContext).size;
    let freshDeals = useContext(GlobalContext).freshDeals;
    let trioDivider = 0;
    let trioDeals = [];
    let trioBuffer;
    let top = true;

    return(<div
        style={{
            ...freshDealsContainer(size)
        }}
    >
        {freshDeals ? freshDeals.map((deal, i) => {
            trioDeals.push(deal);
            trioDivider++;
            if(trioDivider >= 3){
                trioDivider = 0;
                trioBuffer = trioDeals;
                trioDeals = [];
                if(i !== 2){
                    top  = false;
                }
                else{
                    top = true;
                }
                return(<FreshDealTrio
                 key={i}
                 deals={trioBuffer}
                 top={top}
                />);
            }
            return(<span key={Math.random()}></span>);
        }) : <>Error</>}
        <FreshDealTrio />
    </div>);
}

let freshDealsContainer = size => {

    return({
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    });
}