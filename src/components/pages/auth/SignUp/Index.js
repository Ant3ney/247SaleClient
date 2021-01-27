import React, { useContext } from 'react';
import { GlobalContext } from '../../../../utilities/GlobalContext';
import SignUpForm from './SignUpForm';
import Title from './Title';
import authStyles from '../authStyles';

export default function SignUpPage(props){
    const size = useContext(GlobalContext).size;
    const bodyMargin = useContext(GlobalContext).bodyXMargin;

    return(<div
     style={{
         ...authStyles.authPageContainerStyle(size, bodyMargin)
     }}
    >
        <div
         style={{
            ...authStyles.authContentContainer(size)
         }}
        >
            <Title 
             variant={props.variant}
            />
            <SignUpForm 
             variant={props.variant}
            />
        </div>
    </div>);
}