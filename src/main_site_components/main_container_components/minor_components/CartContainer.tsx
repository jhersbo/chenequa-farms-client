import "./Sass/CartContainer.scss"
import { motion } from "framer-motion"
import { useContext, useState } from "react"
import { BlurContext, UserContext } from "../../../contexts/global"
import { CartContext } from "../../../contexts/cart"

import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const arrowSXProps = {
    cursor: "pointer",
    fontSize: "32px",
    color: "#01B763",
}

const shoppingCartSXProps = {
    fontSize: "28px",
    color: "#01B763",
}

const CartContainer = ()=>{

    const userCXT = useContext(UserContext)
    let user = userCXT.value
    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value
    const cartCXT = useContext(CartContext)
    let cart = cartCXT.value

    const [cartExpanded, setCartExpanded] = useState(false)

    return(
        <motion.div 
            id="cart-container"
            animate={{
                height: cartExpanded ? "80vh" : "fit-content"
            }}
            transition={{ 
                duration: 0.5, type: "tween" 
            }}
            style={{"filter": blur ? "blur(4px)" : "none"}}
        >
            <div id="cart-header-container">
                {
                    cartExpanded
                    ?   <KeyboardDoubleArrowDownIcon
                            onClick={()=>{
                                setCartExpanded(false)
                            }}
                            sx={arrowSXProps}
                        />
                    :   <KeyboardDoubleArrowUpIcon 
                            onClick={()=>{
                                setCartExpanded(true)
                            }}
                            sx={arrowSXProps} 
                        />
                }
                <div>
                    $0.00
                </div>
                <ShoppingCartIcon sx={shoppingCartSXProps}/>
            </div>
            {
                cartExpanded
                ?   <>
                        <div id="cart-contents">
                            Cart contents
                        </div>
                        <div id="cart-action-container">
                            Action btns
                        </div>
                    </>
                :
                    null
            }
        </motion.div>
    )
}

export default CartContainer