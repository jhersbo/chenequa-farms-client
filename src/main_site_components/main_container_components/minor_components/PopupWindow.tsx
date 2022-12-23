import { useContext } from "react";
import { BlurContext } from "../../../contexts/global";
import "./Sass/PopupWindow.scss";

interface PopupWindowProps{
    children: JSX.Element | string
}

const PopupWindow = (props: PopupWindowProps)=>{

    let { children } = props

    //on each render, toggle blur on
    const blurCXT = useContext(BlurContext)

    return(
        <div id="popup-window">
            {children}
        </div>
    )
}

export default PopupWindow