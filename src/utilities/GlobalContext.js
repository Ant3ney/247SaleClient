import React, { useContext, useState, useEffect } from 'react';

export const GlobalContext = React.createContext();

export default function GlobalProvider({ children }){
    const [serverOrigin, setServerOrigin] = useState('http://localhost:3001');
    const [user, setUser] = useState(null);
    const [currentNav, setCurrentNav] = useState('Landing');
    const [bodyXMargin, setBodyXMargin] = useState(3);
    const [isSmall, setIsSmall] = useState(isSmallCheck());
    const [size, setSize] = useState(sizeCheck())

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
          window.addEventListener('resize', () => {
            setIsSmall(isSmallCheck());
            setSize(sizeCheck());
            sizeUpdate();
          });
    }, []);

    return(
        <GlobalContext.Provider value={{
            user: user,
            setUser: setUser,
            serverOrigin: serverOrigin,
            setServerOrigin: setServerOrigin,
            currentNav: currentNav,
            setCurrentNav: setCurrentNav,
            bodyXMargin: bodyXMargin,
            setBodyXMargin: setBodyXMargin,
            isSmall: isSmall,
            setIsSmall: setIsSmall,
            size: size,
            setSize: setSize
        }}>
            {children}
        </GlobalContext.Provider>
    );

    function sizeUpdate(){
      if(size == 'small'){
        setBodyXMargin(3);
      }
      if(window.matchMedia("(min-width: 600px)").matches && window.matchMedia("(max-width: 768px)").matches){
        setBodyXMargin(5);
      }
      else{
        setBodyXMargin(3);
      }
    }
}

function isSmallCheck(){
  return (window.matchMedia("(min-width: 768px)").matches ? false : true);
}
function isWideCheck(){
  let width = window.innerWidth;
  let height = window.innerHeight;
  let ratio = (height / width);
  if(ratio <= 0.57338028169 && height <= 540){
    return true;
  }
  else{
     return false;
  }
}
function sizeCheck(){
  if(isWideCheck()){
    return 'wide'
  }
  if(isSmallCheck()){
    return 'small'
  }
  else{
    return 'xl'
  }
}