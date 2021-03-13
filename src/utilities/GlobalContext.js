import React, { useState, useEffect } from 'react';
import getFreshDeals from './deals/getFreshDeals';
import getSpecialDeals from './deals/getSpecialDeals';

export const GlobalContext = React.createContext();

export default function GlobalProvider({ children }){
    const [serverOrigin, setServerOrigin] = useState(ReactIsInDevelomentMode() ? 'http://localhost:3001' : 'https://twentyfourseven-sale-67425.herokuapp.com');
    const [user, setUser] = useState(null);
    const [currentNav, setCurrentNav] = useState('Landing');
    const [bodyXMargin, setBodyXMargin] = useState(3);
    const [isSmall, setIsSmall] = useState(isSmallCheck());
    const [size, setSize] = useState(sizeCheck());

    const [freshDeals, setFreshDeals] = useState(null);
    const [trackedDeal, setTrackedDeal] = useState(null);
    const [featuredDeal, setFeaturedDeal] = useState(null);
    const [popularDeals, setPopularDeals] = useState(null);

    useEffect(() => {
      console.log('serverOrigin: ' + serverOrigin);
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
            //alert('isWideCheck(): ' + isWideCheck());
          });
          getFreshDeals(setFreshDeals);
          getSpecialDeals(setFeaturedDeal, setPopularDeals, serverOrigin);
          // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setSize: setSize,
            freshDeals: freshDeals,
            setFreshDeals: setFreshDeals,
            trackedDeal: trackedDeal,
            setTrackedDeal: setTrackedDeal,
            featuredDeal: featuredDeal,
            setFeaturedDeal: setFeaturedDeal,
            popularDeals: popularDeals,
            setPopularDeals: setPopularDeals
        }}>
            {children}
        </GlobalContext.Provider>
    );

    function sizeUpdate(){
      console.log('size: ' + size);
      if(size === 'extrasmall'){
        setBodyXMargin(1);
      }
      else if(size === 'small'){
        setBodyXMargin(3);
      }
      else if(size === 'medium'){
        setBodyXMargin(3);
      }
      else{
        setBodyXMargin(3);
      }
    }
}
function isWideCheck(){
  let width = window.innerWidth;
  let height = window.innerHeight;
  let ratio = (height / width);
  //alert('window.orientation: ' + window.orientation);
  if(((ratio <= 0.57338028169) || (window.orientation === 0)) && (height <= 540)){
    //alert('Here');
    return true;
  }
  else{
     return false;
  }
}
function isExtraLargeCheck(){
  return (window.matchMedia("(min-width: 1200px)").matches ? true : false);
}
function isLargeCheck(){
  return (window.matchMedia("(min-width: 992px)").matches ? true : false);
}
function isMediumCheck(){
  return (window.matchMedia("(min-width: 768px)").matches ? true : false);
}
function isSmallCheck(){
  return (window.matchMedia("(min-width: 576px)").matches ? true : false);
}
function isExtraSmallCheck(){
  return (window.matchMedia("(max-width: 576px)").matches ? true : false);
}
function sizeCheck(){
  if(isWideCheck()){
    return 'wide';
  }
  if(isExtraLargeCheck()){
    return 'extralarge';
  }
  else if(isLargeCheck()){
    return 'large';
  }
  else if(isMediumCheck()){
    return 'medium';
  }
  else if(isSmallCheck()){
    return 'small';
  }
  else if(isExtraSmallCheck()){
    return 'extrasmall';
  }
}
function ReactIsInDevelomentMode(){ 
  return '_self' in React.createElement('div');
}