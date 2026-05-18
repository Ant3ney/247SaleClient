import React, { useContext } from 'react';
import { GlobalContext } from '../../../../utilities/GlobalContext';
import SignInForm from './SignInForm';
import Title from './Title';
import authStyles from '../authStyles';

export default function SingInPage(props){
    const size = useContext(GlobalContext).size;
    const bodyMargin = useContext(GlobalContext).bodyXMargin;
    return(<div
     className='at-least-full-screen'
     style={{
         ...authStyles.authPageContainerStyle(size, bodyMargin, props.variant),
         ...{
             paddingBottom: '2rem'
         }
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
            <SignInForm 
             variant={props.variant}
            />
        </div>
    </div>);
}