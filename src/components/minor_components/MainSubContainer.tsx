interface MainSubContainerProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>
}

const MainSubContainer = ({ clickIndex, setClickIndex }: MainSubContainerProps)=>{
    switch (clickIndex) {
        case 0:
            return(
                <>
                    Home
                </>
            )
        case 1:
            return(
                <>
                    Categories
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