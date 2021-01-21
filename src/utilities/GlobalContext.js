import React, { useContext, useState, useEffect } from 'react';

export const GlobalContext = React.createContext();

export default function GlobalProvider({ children }){
    const [serverOrigin, setServerOrigin] = useState('http://localhost:3001');
    const [user, setUser] = useState(null);
    const [currentNav, setCurrentNav] = useState('Landing');

    useEffect(() => {
        fetch(serverOrigin + '/getProfile', {
            method: 'get',
            credentials:'include'
          })
          .then((res) => {
            return res.json();
          })
          .then((profileInfo) => {
            console.log(profileInfo);
            if(profileInfo.loggedIn){
              setUser(profileInfo.user);
            }
          });
    }, []);

    return(
        <GlobalContext.Provider value={{
            user: user,
            setUser: setUser,
            serverOrigin: serverOrigin,
            setServerOrigin: setServerOrigin,
            currentNav: currentNav,
            setCurrentNav: setCurrentNav
        }}>
            {children}
        </GlobalContext.Provider>
    );
}