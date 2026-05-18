'use client';

import React from 'react';
import GlobalContextPro from './utilities/GlobalContext';
import NavBar from './components/NavBar';
import BodyNav from './components/BodyNav';
import OrginSetter from './components/TestComps/OrginSetter';

export default function ClientApp() {
   const devmode = false;

   return (
      <GlobalContextPro>
         {devmode ? (
            <div>
               <OrginSetter />
               <button onClick={() => console.log('Test')}>Test code</button>
            </div>
         ) : null}
         <NavBar />
         <BodyNav />
      </GlobalContextPro>
   );
}
