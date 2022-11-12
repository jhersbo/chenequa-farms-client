import "./Sass/NavBar.scss"
import { useContext, useState } from "react";

import Tooltip from '@mui/material/Tooltip';
import CottageIcon from '@mui/icons-material/Cottage';
import CategoryIcon from '@mui/icons-material/Category';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//contexts
import { ScreenSizeContext, UserContext } from "../contexts/global";

//components
import NavBtn from './minor_components/micro_components/NavBtn'

export interface NavMethodsMap{
    label: string,
    jsx: JSX.Element
}

interface NavBarProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>
}

const NavBar = ({ clickIndex, setClickIndex }: NavBarProps)=>{

    const screenSize = useContext(ScreenSizeContext)
    const user = useContext(UserContext)

    const iconSXProp = {
        color: "white",
        fontSize: "3rem",
    }
    
    const navMethods = [
        {
            label: "Browse all items.",
            jsx: <CottageIcon sx={iconSXProp}/>
        },
        {
            label: "Browse categories.",
            jsx: <LocalFloristIcon sx={iconSXProp}/>
        },
        {
            label: "Browse subscriptions.",
            jsx: <LoyaltyIcon sx={iconSXProp}/>
        },
        // {
        //     label: "View your cart.",
        //     jsx: <ShoppingCartIcon sx={iconSXProp}/>
        // }
        {
            label: "Browse pickup dates.",
            jsx: <CalendarMonthIcon sx={iconSXProp}/>
        }
    ]
    return(
        <div className="nav-container">
            <div className="nav-hero-container">
                <h3>LOGO</h3>
            </div>
            <nav>
                <ul className='nav-list'>
                    {
                        navMethods.map((element: NavMethodsMap, index: number)=>{
                            return(
                                <NavBtn element={element} index={index} clickIndex={clickIndex} setClickIndex={setClickIndex}/>
                            )
                        })
                    }
                </ul>
            </nav>
            <div className="nav-foot-container">
                <Tooltip title="Settings" placement="right" arrow>
                    <button className="nav-list-btn foot-btn" aria-label="settings">
                        <SettingsIcon sx={iconSXProp}/>
                    </button>
                </Tooltip>
                <Tooltip title="Logout" placement="right" arrow>
                    <button className="nav-list-btn foot-btn" aria-label="logout">
                        <LogoutIcon sx={iconSXProp}/>
                        {/* change if user is logged in */}
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}

export default NavBar