import React, { useState, useContext } from 'react';
import signUp from '../../../../utilities/auth/signUp';

import { GlobalContext } from '../../../../utilities/GlobalContext';

export default function SignUpForm(){
    const [email, setEmail] = useState('notSet');
    const [name, setName] = useState('notSet');
    const [password, setPassword] = useState('notSet');

    const setUser = useContext(GlobalContext).setUser;
    const serverOrigin = useContext(GlobalContext).serverOrigin;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;
    
    return(<div>
        <h5>Sign-Up</h5>
        <input name="name" onChange={(event) => {setName(event.target.value)}}></input>
        <input name="email" type="email" onChange={(event) => {setEmail(event.target.value)}}></input>
        <input name="password" type="password" onChange={(event) => {setPassword(event.target.value)}}></input>
        <button onClick={() => {
            signUp(name, email, password, setUser, serverOrigin)
            .then(setCurrentNav('Landing'));
         }}
        >Sign Up</button>
    </div>);
}