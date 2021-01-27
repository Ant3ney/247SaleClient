import React, { useContext } from 'react';
import LandScreen from './LandScreen';
import { GlobalContext } from '../../../utilities/GlobalContext';
import PopularDealsScreen from './PopularDealsScreen';
import SignUpScreen from '../auth/SignUp/Index';

export default function LandingPage(){
    const bodyMargin = useContext(GlobalContext).bodyXMargin;

    

    return(<div style={{
            
         }}
        >
            <LandScreen />
            <PopularDealsScreen />
            <SignUpScreen 
             variant={'landingPage'}
            />
        </div>);
}
