import React, { useState, useContext } from 'react';
import signIn from '../../../../utilities/auth/signIn';
import { GlobalContext } from '../../../../utilities/GlobalContext';

export default function SignInForm(){
    const [email, setEmail] = useState('notSet');
    const [password, setPassword] = useState('notSet');

    const setUser = useContext(GlobalContext).setUser;
    const serverOrigin = useContext(GlobalContext).serverOrigin;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;

    return(<div>
        <h5>This is the Sign In form</h5>
        <input name='email' type="email" onChange={(event) => {setEmail(event.target.value)}}></input>
        <input name='password' type="password" onChange={(event) => {setPassword(event.target.value)}}></input>
        <button onClick={() => {
            signIn(email, password, setUser, serverOrigin)
            .then(setCurrentNav('Landing'));
         }}
        >Sign In</button>
    </div>);
}