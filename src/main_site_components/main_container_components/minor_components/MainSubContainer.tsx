import { useContext } from "react";
import { BlurContext } from "../../../contexts/global";
import BrowseContainer from "./BrowseContainer";
import Home from "./Home";
import "./Sass/MainSubContainer.scss";
import SubscriptionsContainer from "./SubscriptionsContainer";

interface MainSubContainerProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>,
}

const MainSubContainer = ({ clickIndex, setClickIndex, }: MainSubContainerProps)=>{

    const blurCXT = useContext(BlurContext)

    switch (clickIndex) {
        case 0:
            return(
                <div className="main-sub-div" style={blurCXT?.payload}>
                    <Home/>
                </div>
            )
        case 1:
            return(
                <div className="main-sub-div" style={blurCXT?.payload}>
                    <BrowseContainer/>
                </div>
            )
        case 2:
            return(
                <div className="main-sub-div" style={blurCXT?.payload}>
                    <SubscriptionsContainer/>
                </div>
            )
        case 3:
            return(
                <div className="main-sub-div" style={blurCXT?.payload}>
                    Pickup dates
                </div>
            )
        default:
            return(
                <>
                    Click Index got messed up
                </>
            )
    }
}

export default MainSubContainer