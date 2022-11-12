//CSS
import './Sass/App.scss'
//Dependencies
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";

//Components

import MainContainer from './main_container_components/MainContainer';
import NavBar from './nav_components/NavBar';

//Contexts
import { ScreenSizeContext, UserContext, UserContextInterface } from './contexts/global';

//Types


const serverURL = process.env.NODE_ENV === "development" 
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
  const [screenSize, setScreenSize] = useState({width: window.innerWidth, height: window.innerHeight})

  //-1 is neutral state
  //0 is home page
  const [ clickIndex, setClickIndex ] = useState(0)

  //admin state
  const [ siteState, setSiteState ] = useState("client")

  useEffect(()=>{
    //eventually move fetching user to different component
    async function fetchUser(){
      let retrievedUser = await fetch(serverURL + "user_auth/2")
      let parsedUser = await retrievedUser.json()
      setUser(parsedUser)
      Cookies.set("user", JSON.stringify(parsedUser))
    }
    fetchUser()
    // Cookies.remove('user')
    setScreenSize({width: window.innerWidth, height: window.innerHeight})
  }, [])

  if(siteState === "admin"){
    return(
      <div className='app'>
        Admin Site
      </div>
    )
  }else{
    return (
      <div className='app'>
        <ScreenSizeContext.Provider value={screenSize}>
          <UserContext.Provider value={user}>
              <NavBar clickIndex={clickIndex} setClickIndex={setClickIndex}/>
              <MainContainer clickIndex={clickIndex} setClickIndex={setClickIndex} setUser={setUser}/>
              {/* Login Popup somewhere in here */}
          </UserContext.Provider>
        </ScreenSizeContext.Provider>
      </div>
    );
  }
}

export default App;
