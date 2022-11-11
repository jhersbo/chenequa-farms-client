import "./Sass/NavBar.scss"
import { useContext } from "react";

import Tooltip from '@mui/material/Tooltip';
import CottageIcon from '@mui/icons-material/Cottage';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

//contexts
import { ScreenSizeContext, UserContext } from "../contexts/global";

interface NavMethodsMap{
    label: string,
    jsx: JSX.Element
}

const NavBar = ()=>{

    const screenSize = useContext(ScreenSizeContext)
    const user = useContext(UserContext)
    
    const navMethods = [
        {
            label: "Browse all items.",
            jsx: <CottageIcon/>
        },
        {
            label: "Browse categories.",
            jsx: <CategoryIcon/>
        },
        {
            label: "View your cart.",
            jsx: <ShoppingCartIcon/>
        }
    ]
    return(
        <div className="nav-container">
            <nav>
                <ul className='nav-list'>
                    {
                        navMethods.map((element: NavMethodsMap, index: number)=>{
                            return(
                                <li key={index} aria-label={element.label} className='nav-list-item'>
                                    <Tooltip title={element.label} placement="right" arrow>
                                        <button className="nav-list-btn">
                                            {element.jsx}
                                        </button>
                                    </Tooltip>
                                </li>
                            )
                        })
                    }
                </ul>
                <h1>
                    {user?.email_address}
                </h1>
                <h1>
                    {"Screensize is : " + screenSize?.height + " x " + screenSize?.width}
                </h1>
            </nav>
        </div>
    )
}

export default NavBar