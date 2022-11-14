import "./Sass/MainContainer.scss"
import { useEffect, useState } from "react"

import MainSubContainer from "./minor_components/MainSubContainer"
import AccountWidget from "./minor_components/micro_components/AccountWidget"
import { UserContextInterface } from "../contexts/global"

interface MainContainerProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>,
    setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>,
    loginState: boolean,
    setLoginState: React.Dispatch<React.SetStateAction<boolean>>
    regState: boolean,
    setRegState: React.Dispatch<React.SetStateAction<boolean>>,
    blur: boolean,
    setBlur: React.Dispatch<React.SetStateAction<boolean>>
}

const MainContainer = ({ clickIndex, setClickIndex, setUser, loginState, setLoginState, regState, setRegState, blur, setBlur }: MainContainerProps)=>{

    return(
        <div className="main-container">
            <div className="main-top-bar">
                <header>
                    <h1>Chenequa Farms</h1>
                </header>
                <h5>*Searchbar*</h5>
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
                <MainSubContainer clickIndex={clickIndex} setClickIndex={setClickIndex}/>
            </div>
        </div>
    )
}

export default MainContainer