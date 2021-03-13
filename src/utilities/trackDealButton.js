import { useContext } from 'react';
import { nativeTouchData } from 'react-dom/test-utils';
//Refactor to own component in the future
export default function trackDealPressed(user, navTo, setDeal, deal){
    if(user){
        setDeal(deal);
        navTo('TrackGame');
    }
    else{
        navTo('SignIn');
    }
}