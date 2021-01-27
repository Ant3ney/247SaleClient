import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import GlobalContextPro from './utilities/GlobalContext';
import NavBar from './components/NavBar';
import BodyNav from './components/BodyNav'
import OrginSetter from './components/TestComps/OrginSetter';

function App() {
  const [devmode, setDevMode] = useState(false);
  return (
    <div>
        <GlobalContextPro>
          {devmode ?
            <div>
              <OrginSetter />
              <button onClick={() => { console.log('Test')}}>Test code</button>
            </div>
          :
            <></>
          }
          <NavBar />
          <BodyNav />
        </GlobalContextPro>
    </div>
  );
}
export default App;
