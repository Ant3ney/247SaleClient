import React, { useContext } from 'react';
import { GlobalContext } from '../utilities/GlobalContext';
import signOut from '../utilities/auth/signOut'

export default function Nav(){
    const user = useContext(GlobalContext).user;
    const setUser = useContext(GlobalContext).setUser;
    const serverOrigin = useContext(GlobalContext).serverOrigin;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;

    return(<nav>
        <ul>
            <li onClick={()=>{setCurrentNav('Landing')}}><img style={{width: "60px"}}src={process.env.PUBLIC_URL + '/SiteLogo.png'} /></li>
            <li onClick={()=>{setCurrentNav('Home')}}>Home</li>
        </ul>
        {!user ? 
            <ul>
                <li onClick={() => {setCurrentNav('SignUp')}}>Sign Up</li>
                <li onClick={() => {setCurrentNav('SignIn')}}>Sign In</li>
            </ul> : 
            <ul>
                <li>Welcome {user ? user.name : 'Error'}</li>
                <li onClick={() => {signOut(setUser, serverOrigin)}}>Logout</li>
            </ul>
        }
        
    </nav>);
}