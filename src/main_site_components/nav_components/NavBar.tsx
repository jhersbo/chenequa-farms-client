import "./Sass/NavBar.scss"
import { useContext } from "react";
import Cookies from "js-cookie";

import Tooltip from '@mui/material/Tooltip';
import CottageIcon from '@mui/icons-material/Cottage';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//contexts
import { BlurContext, ScreenSizeContext, UserContext, UserContextInterface } from "../../contexts/global";

//components
import NavBtn from './minor_components/micro_components/NavBtn'


export interface NavMethodsMap{
    label: string,
    jsx: JSX.Element
}

interface NavBarProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>,
    setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>
    setBlur: React.Dispatch<React.SetStateAction<boolean>>
}

const NavBar = ({ clickIndex, setClickIndex, setUser, setBlur }: NavBarProps)=>{

    const screenSize = useContext(ScreenSizeContext)
    const user = useContext(UserContext)
    const blur = useContext(BlurContext)

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
        {
            label: "Browse pickup dates.",
            jsx: <CalendarMonthIcon sx={iconSXProp}/>
        }
    ]

    const handleSignOut = ()=>{
        setUser(null)
        Cookies.set("user", "")
    }

    return(
        <div className="nav-container" style={{"filter": blur ? "blur(4px)" : "none"}}>
            <div className="nav-hero-container">
                <h3>LOGO</h3>
            </div>
            <nav>
                <ul className='nav-list'>
                    {
                        navMethods.map((element: NavMethodsMap, index: number)=>{
                            return(
                                <NavBtn 
                                    key={index} 
                                    element={element} 
                                    index={index} 
                                    clickIndex={clickIndex} 
                                    setClickIndex={setClickIndex}
                                />
                            )
                        })
                    }
                </ul>
            </nav>
            <div className="nav-foot-container">
                {/* <Tooltip title="Settings" placement="right" arrow>
                    <button className="nav-list-btn foot-btn" aria-label="settings">
                        <SettingsIcon sx={iconSXProp}/>
                    </button>
                </Tooltip> */}
                <Tooltip title="Logout" placement="right" arrow>
                    <button className="nav-list-btn foot-btn" aria-label="logout" onClick={()=>{handleSignOut()}}>
                        <LogoutIcon sx={iconSXProp}/>
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}

export default NavBar