//CSS
import './Sass/App.scss';
//Dependencies
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

//Components
import MainContainer from './main_site_components/main_container_components/MainContainer';
import NavBar from './main_site_components/nav_components/NavBar';
import ResetPassword from './side_components/ResetPassword';

//Contexts
import { BlurContext, ScreenSizeContext, UserContext, UserContextInterface } from './contexts/global';

function App() {
  // Cookies.remove("user")
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
  //popup state
  const [ blur, setBlur ] = useState(false)


  //context state objects
  const blurCxtObj = {
    value: blur,
    setBlur: (value: boolean)=>{
      setBlur(value)
    },
    payload: {
      "filter": blur ? "brightness(0.6)" : "none"
    }
  }

  const userCxtObj = {
    value: user,
    setUser: (user: UserContextInterface | null)=>{
      setUser(user)
    }
  }

  useEffect(()=>{
    setScreenSize({width: window.innerWidth, height: window.innerHeight})
  }, [window.innerWidth, window.innerHeight])

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
                <UserContext.Provider value={userCxtObj}>
                  <BlurContext.Provider value={blurCxtObj}>
                    <NavBar 
                      clickIndex={clickIndex} 
                      setClickIndex={setClickIndex}
                    />
                    <MainContainer 
                      clickIndex={clickIndex} 
                      setClickIndex={setClickIndex}
                      setSiteState={setSiteState}
                    />
                  </BlurContext.Provider>
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
