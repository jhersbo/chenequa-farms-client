import "./Sass/MainContainer.scss"

import MainSubContainer from "./minor_components/MainSubContainer"
import AccountWidget from "./minor_components/micro_components/AccountWidget"
import { UserContextInterface } from "../contexts/global"

interface MainContainerProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>,
    setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>
}

const MainContainer = ({ clickIndex, setClickIndex, setUser }: MainContainerProps)=>{
    return(
        <div className="main-container">
            <div className="main-top-bar">
                <header>
                    <h1>Chenequa Farms</h1>
                </header>
                <h5>*Searchbar*</h5>
                <AccountWidget setUser={setUser}/>
            </div>
            <div>
                <MainSubContainer clickIndex={clickIndex} setClickIndex={setClickIndex}/>
            </div>
        </div>
    )
}

export default MainContainer