import "./Sass/MainContainer.scss"

import MainSubContainer from "./minor_components/MainSubContainer"

interface MainContainerProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>
}

const MainContainer = ({ clickIndex, setClickIndex }: MainContainerProps)=>{
    return(
        <div className="main-container">
            <div className="main-top-bar">
                <header>
                    <h1>Chenequa Farms</h1>
                </header>
                <h5>*Searchbar*</h5>
                <h5>*Account*</h5>
            </div>
            <div>
                <MainSubContainer clickIndex={clickIndex} setClickIndex={setClickIndex}/>
            </div>
        </div>
    )
}

export default MainContainer