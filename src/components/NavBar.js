import React, { useContext, useState } from 'react';
import { GlobalContext } from '../utilities/GlobalContext';
import signOut from '../utilities/auth/signOut';
import MediaQuery from 'react-responsive'
import GlobalConstants from '../utilities/GlobalConstants';

export default function Nav(){
    const [navPressed, setNavPressed] = useState(false)
    const user = useContext(GlobalContext).user;
    const setUser = useContext(GlobalContext).setUser;
    const serverOrigin = useContext(GlobalContext).serverOrigin;
    const setCurrentNav = useContext(GlobalContext).setCurrentNav;
    const bodyMargin = useContext(GlobalContext).bodyXMargin;
    const size = useContext(GlobalContext).size;

    if(size == 'small'){
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
                    >
                        <img 
                         style={{
                                ...imageStyle(size)
                            }}
                         src={process.env.PUBLIC_URL + '/SiteLogo.png'} 
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
                    >
                        Home
                    </li>
                    <li
                     style={{
                         ...hamburgerLi(size),
                         ...hamburgerBorder
                     }}
                    >
                        Contact
                    </li>
                    <li
                     style={{
                         ...hamburgerLi(size),
                         ...hamburgerBorder
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
                    >
                        <img 
                         style={{
                                ...imageStyle(size)
                            }}
                         src={process.env.PUBLIC_URL + '/SiteLogo.png'} 
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
                         onClick={()=>{setCurrentNav('Home')}}
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
                        <li onClick={() => {signOut(setUser, serverOrigin)}}>Logout</li>
                    </ul>
                }
                
            </nav>);
    }
}

let navStyle = (size) => {
    let marginTop;
    if(size == 'wide'){
        marginTop = '6vh';
    }
    else{
        marginTop = '3vh';
    }

    return({
        display: "flex",
        position: 'absolute',
        width: '100%',
        height: '7vh',
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
    if(size == 'wide'){
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
    if(size == 'wide'){
        width = '5em';
    }
    else if(size == 'small'){
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