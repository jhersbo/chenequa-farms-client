import "./Sass/PopupWindow.scss";
import { useRef, useLayoutEffect, useState } from "react";

interface PopupWindowProps{
    children: JSX.Element | string
}

interface DimensionTypes{
    width: number | undefined
    height: number | undefined
}

const PopupWindow = (props: PopupWindowProps)=>{

    let { children } = props

    const windowRef = useRef(null)

    //renders popup exactly in the middle of the window
    const [dimensions, setDimensions] = useState<DimensionTypes>({
        width: undefined,
        height: undefined,
    })
    useLayoutEffect(()=>{
        const { width, height } = ((windowRef.current as unknown) as HTMLDivElement).getBoundingClientRect()
        setDimensions({
            width: width,
            height: height
        })
    }, [])
    let popupStyle = {
        left: (window.innerWidth / 2) - ((dimensions.width as number) / 2),
        top: (window.innerHeight / 2) - ((dimensions.height as number) / 2)
    }

    return(
        <div 
            ref={windowRef} 
            style={popupStyle} 
            id="popup-window">
            {children}
        </div>
    )
}

export default PopupWindow