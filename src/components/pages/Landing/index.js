import React from 'react';
import LandScreen from './LandScreen';
import PopularDealsScreen from './PopularDealsScreen';
import SignUpScreen from '../auth/SignUp/Index';
import FreshDealsScreen from './FreshDealsScreen';

export default function LandingPage(){

    return(<div style={{
            
         }}
        >
            <LandScreen />
            <PopularDealsScreen />
            <SignUpScreen 
             variant={'landingPage'}
            />
            <FreshDealsScreen />
        </div>);
}
