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
import LargeActionBtn from "./micro_components/LargeActionBtn"

const arrowSXProps = {
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
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({state: false, message: ""})

    const calculateTotalPrice = ()=>{
        let total = 0

        cart.forEach(({ item, qty }: any) => {
            total += qty * parseFloat(item.price)
        });

        return total
    }

    const handleSubmitOrder = async ()=>{
        try {
            setIsLoading(true)
        } catch (error) {
            
        }
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
                    ?   <button
                            className="style-free-btn"
                            aria-label="collapse cart"
                            onClick={()=>{
                                setCartExpanded(false)
                            }}
                        >
                            <KeyboardDoubleArrowDownIcon
                                sx={arrowSXProps}
                            />
                        </button>
                    :   <button
                            className="style-free-btn"
                            aria-label="expand cart"
                            onClick={()=>{
                                setCartExpanded(true)
                            }}
                        >
                            <KeyboardDoubleArrowUpIcon 
                                sx={arrowSXProps} 
                            />
                        </button>
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
                                cart.length !== 0
                                ?   cart.map((element: any, index: number)=>{
                                        return(
                                            <CartItem key={`cart-item-${index}`} element={element} index={index}/>
                                        )
                                    })
                                :   <div id="nothing-msg-container">
                                        <span>Nothing in your cart!</span>
                                    </div>
                            }
                        </CartContents>
                        <LargeActionBtn 
                            isLoading={isLoading} 
                            error={error} 
                            action={handleSubmitOrder}
                        >
                            Place Order
                        </LargeActionBtn>
                    </>
                :
                    null
            }
        </motion.div>
    )
}

export default CartContainer