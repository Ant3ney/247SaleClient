import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import GlobalContextPro from './utilities/GlobalContext';
import NavBar from './components/NavBar';
import BodyNav from './components/BodyNav'
import OrginSetter from './components/TestComps/OrginSetter';

function App() {
  return (
    <div>
      <button onClick={() => { console.log('Test')}}>Test code</button>
        <GlobalContextPro>
          <OrginSetter />
          <NavBar />
          <BodyNav />
        </GlobalContextPro>
    </div>
  );
}
export default App;
