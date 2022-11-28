import "./Sass/MainContainer.scss"
import { useContext, useEffect, useState } from "react"

import MainSubContainer from "./minor_components/MainSubContainer"
import AccountWidget from "./minor_components/AccountWidget"
import { BlurContext, UserContext, UserContextInterface } from "../../contexts/global"

import AdminBtn from "./minor_components/micro_components/AdminBtn"
import SearchBar from "./minor_components/micro_components/SearchBar"

interface MainContainerProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>,
    setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>,
    setBlur: React.Dispatch<React.SetStateAction<boolean>>,
    setSiteState: React.Dispatch<React.SetStateAction<string>>
}



const MainContainer = (props: MainContainerProps)=>{

    let { 
        clickIndex, 
        setClickIndex, 
        setUser,
        setBlur, 
        setSiteState 
    } = props

    let user = useContext(UserContext)

    let blur = useContext(BlurContext)

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