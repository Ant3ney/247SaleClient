import React, { useContext } from 'react';
import SignUpPage from './pages/auth/SignUp/Index';
import SignInForm from './pages/auth/SignIn/Index';
import LandingPage from './pages/Landing/index';
import HomePage from './pages/Home/index';
import TrackGamePage from './pages/TrackGame/Index';
import { GlobalContext } from '../utilities/GlobalContext';
import InDevelopmentPage from './pages/InDevelopment/Index';

export default function BodyNav(){
    const currentNav = useContext(GlobalContext).currentNav;

    if(currentNav === 'Landing'){
        return <LandingPage />;
    }
    else if(currentNav === 'Home'){
        return <HomePage />;
    }
    else if(currentNav === 'InDevelopment'){
        return(<InDevelopmentPage />)
    }
    else if(currentNav === 'SignUp'){
        return (<SignUpPage
         variant={'authPage'}
        />);
    }
    else if(currentNav === 'SignIn'){
        return(<SignInForm
            variant={'authPage'}
           />);
    }
    else if(currentNav === 'TrackGame'){
        return(<TrackGamePage />);
    }
}