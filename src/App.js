import './App.css';
import React from 'react';
import GlobalContextPro from './utilities/GlobalContext';
import NavBar from './components/NavBar';
import BodyNav from './components/BodyNav'
import OrginSetter from './components/TestComps/OrginSetter';

function App() {
  const devmode = false;
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
