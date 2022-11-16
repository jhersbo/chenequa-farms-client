//CSS
import './Sass/App.scss'
//Dependencies
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react";

//Components

import MainContainer from './main_site_components/main_container_components/MainContainer';
import NavBar from './main_site_components/nav_components/NavBar';
import ResetPassword from './side_components/ResetPassword';

//Contexts
import { ScreenSizeContext, UserContext, UserContextInterface } from './contexts/global';

export const serverURL = process.env.NODE_ENV === "development" 
? process.env.REACT_APP_LOCAL_SERVER 
: process.env.REACT_APP_PROD_SERVER

function App() {

  let cookieUser = Cookies.get('user')
  if(cookieUser){
    cookieUser = JSON.parse(cookieUser)
    
  }

  const [user, setUser] = useState(
    ((cookieUser as unknown) as UserContextInterface | null) ?? null
  )
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth, 
    height: window.innerHeight
  })

  //0 is home page. Follows .map() index in NavBar.tsx
  const [ clickIndex, setClickIndex ] = useState(0)

  //admin state
  const [ siteState, setSiteState ] = useState("client")
  //login states
  const [ loginState, setLoginState ] = useState(false)
  const [ regState, setRegState ] = useState(false)
  const [ blur, setBlur ] = useState(false)

  useEffect(()=>{
    if(loginState || regState){
      setBlur(true)
    }
    setScreenSize({width: window.innerWidth, height: window.innerHeight})
  }, [loginState, regState])

  if(siteState === "admin"){
    return(
      <div className='app'>
        Admin Site
      </div>
    )
  }else{
    return (
      <div className='app'>
        <Router>
          <Routes>
            <Route path='/' element={
              <ScreenSizeContext.Provider value={screenSize}>
                <UserContext.Provider value={user}>
                    <NavBar 
                      clickIndex={clickIndex} 
                      setClickIndex={setClickIndex} 
                      setUser={setUser} 
                      loginState={loginState} 
                      setLoginState={setLoginState} 
                      regState={regState} 
                      setRegState={setRegState}
                      blur={blur}
                      setBlur={setBlur}
                    />
                    <MainContainer 
                      clickIndex={clickIndex} 
                      setClickIndex={setClickIndex} 
                      setUser={setUser} 
                      loginState={loginState} 
                      setLoginState={setLoginState} 
                      regState={regState} 
                      setRegState={setRegState}
                      blur={blur}
                      setBlur={setBlur}
                      setSiteState={setSiteState}
                    />
                </UserContext.Provider>
              </ScreenSizeContext.Provider>
            }/>
            <Route path='/forgot-password/:token' element={
              <ResetPassword/>
            }/>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
