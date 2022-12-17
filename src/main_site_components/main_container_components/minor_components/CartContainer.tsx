import "./Sass/CartContainer.scss"
import { motion } from "framer-motion"
import { useContext, useState } from "react"
import { BlurContext, UserContext } from "../../../contexts/global"
import { CartContext } from "../../../contexts/cart"

import CartItem from "./micro_components/CartItem"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartContents from "./micro_components/CartContents"

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
    console.log(cart)
    const [cartExpanded, setCartExpanded] = useState(false)

    const calculateTotalPrice = ()=>{
        let total = 0

        cart.forEach(({ item, qty }: any) => {
            total += qty * parseFloat(item.price)
        });

        return total
    }

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
                    Total: ${calculateTotalPrice()}
                </div>
                <ShoppingCartIcon sx={shoppingCartSXProps}/>
            </div>
            {
                cartExpanded
                ?   <>
                        <CartContents>
                            {
                                cart.map((element: any, index: number)=>{
                                    return(
                                        <CartItem key={`cart-item-${index}`} element={element} index={index}/>
                                    )
                                })
                            }
                        </CartContents>
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