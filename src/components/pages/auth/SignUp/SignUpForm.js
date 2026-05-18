import React, { useState, useContext } from 'react';
import signUp from '../../../../utilities/auth/signUp';
import authStyles from '../authStyles';

import { GlobalContext } from '../../../../utilities/GlobalContext';

export default function SignUpForm(props){
    const [email, setEmail] = useState('notSet');
    const [name, setName] = useState('notSet');
    const [password, setPassword] = useState('notSet');

    const setUser = useContext(GlobalContext).setUser;
    const serverOrigin = useContext(GlobalContext).serverOrigin;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;
    const size = useContext(GlobalContext).size;

    let labelMarginTop;
    if(size === 'wide'){
        labelMarginTop = '0.5em'
    }
    else{
        labelMarginTop = '1em'
    }

    return(<div
     style={{
         ...authStyles.authFormContainer(size, props.variant)
     }}
    >
        <label 
         htmlFor='nameInput'
         style={{
             ...authStyles.authFormLabel(size)
         }}
        >
            Name
        </label>
        <input 
         id='nameInput' 
         name="name" 
         onChange={(event) => {setName(event.target.value)}}
         className='auth-input'
         style={{
             ...authStyles.authInput(size, props.variant)
         }}
         placeholder="John Doe"
        >
        </input>
        <label 
         htmlFor='nameInput'
         style={{
             ...authStyles.authFormLabel(size),
             ...{
                 marginTop: labelMarginTop
             }
         }}
        >
            email
        </label>
        <input 
         id='emailInput' 
         name="email" 
         type="email"
         className='auth-input'
         onChange={(event) => {setEmail(event.target.value)}}
         style={{
            ...authStyles.authInput(size, props.variant)
         }}
         placeholder='johndoe@gmail.com'
        >
        </input>
        <label 
         htmlFor='nameInput'
         style={{
             ...authStyles.authFormLabel(size),
             ...{
                 marginTop: labelMarginTop
             }
         }}
        >
            password
        </label>
        <input 
         id='passwordInput' 
         name="password" 
         type="password" 
         className='auth-input'
         onChange={(event) => {setPassword(event.target.value)}}
         style={{
            ...authStyles.authInput(size, props.variant)
         }}
         placeholder='************'
        >
        </input>
        <button 
         onClick={() => {
            signUp(name, email, password, setUser, serverOrigin)
            .then(setCurrentNav('Landing'));
         }}
         style={{
             ...authStyles.authButtons(size, props.variant)
         }}
        >
            Sign Up
        </button>
    </div>);
}