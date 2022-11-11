import Cookies from 'js-cookie'
import { createContext, useEffect, useState } from "react";

//Contexts
import { UserContext, ScreenSizeContext } from './contexts/global';

const serverURL = process.env.NODE_ENV === "development" 
? process.env.REACT_APP_LOCAL_SERVER 
: process.env.REACT_APP_PROD_SERVER

function App() {

  const [user, setUser] = useState({})
  const [screenSize, setScreenSize] = useState({})

  useEffect(()=>{
    //eventually move fetching user to different component
    async function fetchUser(){
      let retrievedUser = await fetch(serverURL + "user_auth/2")
      let parsedUser = await retrievedUser.json()
      setUser(parsedUser)
      Cookies.set("user", JSON.stringify(parsedUser))
    }
    // fetchUser()
    // Cookies.remove('user')
    setScreenSize({width: window.innerWidth, height: window.innerHeight})
  }, [])

  return (
    <div className="App">
      <ScreenSizeContext.Provider value={screenSize}>
        <UserContext.Provider value={user}>

        </UserContext.Provider>
      </ScreenSizeContext.Provider>
    </div>
  );
}

export default App;
