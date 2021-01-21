import React, { useContext } from 'react';
import SignUpForm from './pages/auth/SignUp/SignUpForm';
import SignInForm from './pages/auth/SignIn/SignInForm';
import LandingPage from './pages/Landing/index';
import HomePage from './pages/Home/index';
import { GlobalContext } from '../utilities/GlobalContext';

export default function BodyNav(){
    const currentNav = useContext(GlobalContext).currentNav;
    const setCurrentNav = useContext(GlobalContext).currentNav;

    if(currentNav === 'Landing'){
        return <LandingPage />;
    }
    else if(currentNav === 'Home'){
        return <HomePage />;
    }
    else if(currentNav === 'SignUp'){
        return (<SignUpForm
                 setCurrentNav={setCurrentNav}
                />);
    }
    else if(currentNav === 'SignIn'){
        return(<SignInForm />);
    }
}