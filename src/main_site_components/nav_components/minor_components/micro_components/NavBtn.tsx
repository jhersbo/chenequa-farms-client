import "../../Sass/NavBar.scss"
import { useState, useContext } from "react";
import { BlurContext } from "../../../../contexts/global"
//Types
import { NavMethodsMap } from "../../NavBar"

//Components
import { Tooltip } from "@mui/material"


interface NavBtnProps{
    element: NavMethodsMap,
    index: number,
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>,
}

const NavBtn = ({ element, index, clickIndex, setClickIndex}: NavBtnProps)=>{

    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    return(
        <li key={index} aria-label={element.label} className='nav-list-item' style={{
            backgroundColor: clickIndex === index ? "#01B763": "inherit",
        }}>
            <Tooltip title={element.label} placement="right" arrow disableHoverListener={blur}>
                <button 
                    className="nav-list-btn" 
                    aria-label={element.label} 
                    disabled={blur}
                    onClick={()=>{setClickIndex(index)}}>
                    {element.jsx}
                </button>
            </Tooltip>
        </li>
    )
}

export default NavBtn