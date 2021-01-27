import React, { useContext } from 'react';
import authStyles from '../authStyles';

import { GlobalContext } from '../../../../utilities/GlobalContext';

export default function(props){
    const size = useContext(GlobalContext).size;

    return(<div
     style={{
         ...authStyles.authTitleContainer(size, props.variant)
     }}
    >
        <h1
         style={{
             ...authStyles.authTitle(size, props.variant)
         }}
        >
            Register and Never miss another Deal!
        </h1>
        <p
         style={{
             ...authStyles.authSubTitle(size, props.variant)
         }}
        >
            We will let you know when your favorite game goes on sale
        </p>
    </div>)
}