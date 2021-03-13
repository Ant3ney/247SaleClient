import React, { useContext, useState } from 'react';
import { GlobalContext } from '../utilities/GlobalContext';
import signOut from '../utilities/auth/signOut';

export default function Nav(){
    const [navPressed, setNavPressed] = useState(false)
    const user = useContext(GlobalContext).user;
    const setUser = useContext(GlobalContext).setUser;
    const serverOrigin = useContext(GlobalContext).serverOrigin;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;
    const bodyMargin = useContext(GlobalContext).bodyXMargin;
    const size = useContext(GlobalContext).size;

    if(size === 'small' || size === 'extrasmall'){
        if(navPressed){
            return(<nav
             style={{
                 ...navStyle(size),
                 ...{
                    backgroundColor: '#112123',
                    height: 'fit-content',
                    flexDirection: 'column',
                    zIndex: 1
                 }
             }}
            >
                <ul
                 style={{
                     ...ulStyle,
                     ...{
                         marginLeft: bodyMargin + 'em',
                         marginRight: bodyMargin + 'em',
                         marginBottom: 0,
                         paddingLeft: 0
                     }
                 }}
                >
                    <li
                     style={{
                        ...liStyle(size),
                        ...{
                            marginRight: 'auto'
                        }
                     }}
                     onClick={() => {
                        setCurrentNav('Landing');
                        setNavPressed(false);
                     }}
                    >
                        <img 
                         style={{
                                ...imageStyle(size)
                            }}
                         src={process.env.PUBLIC_URL + '/SiteLogo.png'} 
                         alt='Site Logo'
                        />
                    </li>
                    <li
                     style={{
                        ...liStyle(size),
                        ...{
                            marginLeft: 'auto'
                        }
                     }}
                    >
                        <i className="fas fa-bars"
                         style={{
                             ...hamburgerStyle
                         }}
                         onClick={() => {setNavPressed(false)}}
                        >

                        </i>
                    </li>
                </ul>
                <ul
                 style={{
                    ...ulStyle,
                    ...{
                        marginLeft: bodyMargin + 'em',
                        marginRight: bodyMargin + 'em',
                        paddingLeft: 0,
                        marginBottom: 0,
                        flexDirection: 'column'
                    }
                 }}
                >
                    <li
                     style={{
                         ...hamburgerLi(size),
                         ...hamburgerBorder
                     }}
                     onClick={() => {
                         setCurrentNav('Home');
                         setNavPressed(false);
                     }}
                    >
                        Home
                    </li>
                    <li
                     style={{
                         ...hamburgerLi(size),
                         ...hamburgerBorder
                     }}
                     onClick={() => {
                     setCurrentNav('InDevelopment');
                     setNavPressed(false);
                     }}
                    >
                        Contact US
                    </li>
                    <li
                     style={{
                         ...hamburgerLi(size),
                         ...hamburgerBorder
                     }}
                     onClick={() => {
                         setCurrentNav('SignIn');
                         setNavPressed(false);
                     }}
                    >
                        SignIn
                    </li>
                    <li
                     style={{
                         ...hamburgerLi(size),
                         ...hamburgerBorder,
                         ...{
                            borderBottom: '1px solid #FCD399',
                            marginBottom: '0.5em'
                         }
                     }}
                     onClick={() => {
                         setCurrentNav('SignUp');
                         setNavPressed(false);
                     }}
                    >
                        SignUp
                    </li>
                </ul>
            </nav>)
        }
        else{
            return(<nav style={navStyle(size)}>
                <ul
                 style={{
                    ...ulStyle,
                    ...{
                        marginLeft: bodyMargin + 'em',
                        marginRight: bodyMargin + 'em',
                        paddingLeft: 0,
                        width: '100%'
                    }
                 }}
                >
                    <li
                     style={{
                        ...liStyle(size),
                        ...{
                            marginRight: 'auto'
                        }
                     }}
                     onClick={() => {
                        setCurrentNav('Landing');
                     }}
                    >
                        <img 
                         style={{
                                ...imageStyle(size)
                            }}
                         src={process.env.PUBLIC_URL + '/SiteLogo.png'} 
                         alt='Site Logo'
                        />
                    </li>
                    <li
                     style={{
                        ...liStyle(size),
                        ...{
                            marginLeft: 'auto'
                        }
                     }}
                    >
                        <i class="fas fa-bars"
                         style={{
                             ...hamburgerStyle
                         }}
                         onClick={() => {setNavPressed(true)}}
                        >

                        </i>
                    </li>
                </ul>
            </nav>);
        }
    }
    else{
        return(
            <nav style={navStyle(size)}>
                <ul style={{
                        ...ulStyle,
                        ...{
                            paddingLeft: 0,
                            marginLeft: bodyMargin + 'em'
                        }
                     }}
                    >
                    <li style={{
                        ...liStyle(size),
                        ...{
                            
                        }
                     }}
                     onClick={()=>{setCurrentNav('Landing')}}
                    >
                        <img 
                         style={{
                                ...imageStyle(size)
                            }}
                         src={process.env.PUBLIC_URL + '/SiteLogo.png'} 
                         alt='Site Logo'
                        />
                    </li>
                        <li style={{
                            ...liStyle(size),
                            ...{
                                marginLeft: '3em'
                            }
                         }}
                         onClick={()=>{setCurrentNav('Home')}}
                        >
                            Home
                        </li>
                        <li style={{
                            ...liStyle(size),
                            ...{
                                marginLeft: '3em'
                            }
                         }}
                         onClick={()=>{setCurrentNav('InDevelopment')}}
                        >
                            Contact US
                        </li>
                </ul>
                {!user ?
                    <ul style={{
                            ...ulStyle,
                            ...{
                                marginLeft: 'auto',
                                marginRight: (bodyMargin + 'em')
                            }
                        }}
                    >
                        <li style={{
                            ...liStyle(size),
                            ...{
                                marginRight: '3em'
                            }
                         }}
                         onClick={() => {setCurrentNav('SignUp')}}
                        >
                            Sign Up
                        </li>
                        <li 
                         style={{
                             ...liStyle(size),
                             ...{
                            
                             }
                         }}
                         onClick={() => {setCurrentNav('SignIn')}}
                        >Sign In</li>
                    </ul>   :  
                    <ul
                     style={{
                        ...ulStyle,
                        ...{
                            marginLeft: 'auto',
                            marginRight: (bodyMargin + 'em')
                        }
                     }}
                    >
                        <li style={{
                            ...liStyle(size),
                                ...{
                                    marginRight: '3em'
                                }
                         }}
                        >
                            Welcome {user ? user.name : 'Error'}
                        </li>
                        <li 
                         style={{
                            ...liStyle(size)
                         }}
                         onClick={() => {signOut(setUser, serverOrigin)}}>Logout</li>
                    </ul>
                }
                
            </nav>);
    }
}

let navStyle = (size) => {
    let paddingTop;
    let marginTop;
    if(size === 'wide'){
        marginTop = 0;
    }
    else if(size === 'small' || size === 'extrasmall'){
        paddingTop = '3vh';
        marginTop = 0;
    }
    else{
        marginTop = '3vh';
    }

    return({
        display: "flex",
        position: 'absolute',
        width: '100%',
        height: 'fit-content',
        paddingTop: paddingTop,
        marginTop: marginTop
    });
}

let ulStyle={
    listStyleType: "none",
    display: 'flex',
    alignItems: 'center'
}

let liStyle = (size) => {
    let fontSize;
    if(size === 'wide'){
        fontSize = '0.75em';
    }
    else{
        fontSize = '1em';
    }

    return({
        fontFamily: 'Segoe UI',
        color: 'white',
        fontSize: fontSize
    });
}
let hamburgerStyle={
    fontSize: '1.5em'
}

let imageStyle = (size) => {
    let width;
    if(size === 'wide'){
        width = '5em';
    }
    else if(size === 'small' || size === 'extrasmall'){
        width = '4em';
    }
    else{
        width = '8em';
    }
    return({
        width: width
    });
}
let hamburgerLi = (size) => {

    return({
        marginLeft: 'auto',
        color: 'white',
        fontFamily: 'Segoe UI',
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        width: '4em',
        textAlign: 'right'
    });
}
let hamburgerBorder = {
    borderTop: '1px solid #FCD399',
}