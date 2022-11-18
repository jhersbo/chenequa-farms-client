import "./Sass/MainContainer.scss"
import { useContext, useEffect, useState } from "react"

import MainSubContainer from "./minor_components/MainSubContainer"
import AccountWidget from "./minor_components/AccountWidget"
import { UserContext, UserContextInterface } from "../../contexts/global"

import AdminBtn from "./minor_components/micro_components/AdminBtn"
import SearchBar from "./minor_components/micro_components/SearchBar"

interface MainContainerProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>,
    setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>,
    loginState: boolean,
    setLoginState: React.Dispatch<React.SetStateAction<boolean>>
    regState: boolean,
    setRegState: React.Dispatch<React.SetStateAction<boolean>>,
    blur: boolean,
    setBlur: React.Dispatch<React.SetStateAction<boolean>>,
    setSiteState: React.Dispatch<React.SetStateAction<string>>
}



const MainContainer = ({ clickIndex, setClickIndex, setUser, loginState, setLoginState, regState, setRegState, blur, setBlur, setSiteState }: MainContainerProps)=>{

    let user = useContext(UserContext)

    return(
        <div className="main-container">
            <div className="main-top-bar">
                <header style={{"filter": blur ? "blur(4px)" : "none"}}>
                    <h1>ChenequaFarms.com</h1>
                </header>
                <SearchBar blur={blur}/>
                {
                    user?.is_admin ?
                        <AdminBtn setSiteState={setSiteState}/>
                    :
                        null
                }
                <AccountWidget 
                    setUser={setUser}
                    loginState={loginState} 
                    setLoginState={setLoginState} 
                    regState={regState} 
                    setRegState={setRegState}
                    setBlur={setBlur}
                />
            </div>
            <div style={{"filter": blur ? "blur(4px)" : "none"}}>
                <MainSubContainer 
                    clickIndex={clickIndex} 
                    setClickIndex={setClickIndex}
                    blur={blur}
                />
            </div>
        </div>
    )
}

export default MainContainer