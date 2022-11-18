import BrowseContainer from "./BrowseContainer"
import Home from "./Home"

interface MainSubContainerProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>,
    blur: boolean
}

const MainSubContainer = ({ clickIndex, setClickIndex, blur }: MainSubContainerProps)=>{
    switch (clickIndex) {
        case 0:
            return(
                <>
                    <Home/>
                </>
            )
        case 1:
            return(
                <>
                    <BrowseContainer 
                        blur={blur}
                    />
                </>
            )
        case 2:
            return(
                <>
                    Subscriptions
                </>
            )
        case 3:
            return(
                <>
                    Pickup dates
                </>
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