import Cookies from "js-cookie"
import { useContext, useState } from "react"
import "./Sass/MainContainer.scss"

import { CartContext } from "../../contexts/cart"
import { BlurContext, UserContext } from "../../contexts/global"
import AccountWidget from "./minor_components/AccountWidget"
import MainSubContainer from "./minor_components/MainSubContainer"

import CartContainer from "./minor_components/CartContainer"
import AdminBtn from "./minor_components/micro_components/AdminBtn"
import SearchBar from "./minor_components/micro_components/SearchBar"

interface MainContainerProps{
    clickIndex: number,
    setClickIndex: React.Dispatch<React.SetStateAction<number>>,
    setSiteState: React.Dispatch<React.SetStateAction<string>>
}



const MainContainer = (props: MainContainerProps)=>{

    let { 
        clickIndex, 
        setClickIndex,
        setSiteState 
    } = props

    let userCXT = useContext(UserContext)
    let user = userCXT.value
    let blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    let cookieCart = Cookies.get("cart")
    if(cookieCart){
        cookieCart = JSON.parse(cookieCart)
    }
    const [cart, setCart] = useState(
        cookieCart === undefined
        ? []
        : cookieCart
    )
    
    const cartCTX = {
        value: cart,
        setCart: (value: any) => setCart(value)
    }

    return(
        <div className="main-container">
            <CartContext.Provider value={cartCTX}>
                <div className="main-top-bar">
                    <h1 
                        style={{"filter": blur ? "blur(4px)" : "none"}}
                        className="brand-header"
                    >
                        ChenequaFarms.com
                    </h1>
                    <SearchBar/>
                    {
                        user?.is_admin ?
                            <AdminBtn setSiteState={setSiteState}/>
                        :
                            null
                    }
                    <AccountWidget/>
                </div>
                <div style={{"filter": blur ? "blur(4px)" : "none"}}>
                    <MainSubContainer 
                        clickIndex={clickIndex} 
                        setClickIndex={setClickIndex}
                    />
                </div>
                <CartContainer/>
            </CartContext.Provider>
        </div>
    )
}

export default MainContainer