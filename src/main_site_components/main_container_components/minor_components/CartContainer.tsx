import { motion } from "framer-motion"
import Cookies from "js-cookie"
import { useContext, useState } from "react"
import { serverURL } from "../../../App"
import { CartContext } from "../../../contexts/cart"
import { BlurContext, UserContext } from "../../../contexts/global"
import "./Sass/CartContainer.scss"

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CartContents from "./micro_components/CartContents"
import CartItem from "./micro_components/CartItem"
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
        setIsLoading(true)
        let stringItems = cart.map((el: any, index: number)=>{
            return JSON.stringify(el)
        })
        if(!user){
            setIsLoading(false)
            setError({state: true, message: "Log in to place your order!"})
            return
        }
        //retrieve auth token
        let cookieToken = Cookies.get("token");
        if(cookieToken){
            cookieToken = JSON.parse(cookieToken)
        }else{
            setIsLoading(false)
            setError({
                state: true, 
                message: "Session expired. Please log in again."
            })
            return
        }
        try {
            let response = await fetch(serverURL + "user_orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookieToken}`,
                },
                body: JSON.stringify({
                    user_id: user.user_id,
                    order_price: calculateTotalPrice(),
                    order_content: stringItems
                })
            })
            let parsedResponse = await response.json()
            console.log(parsedResponse)
            if(!parsedResponse.success){
                setIsLoading(false)
                setError({state: true, message: parsedResponse.message})
                return
            }
            setIsLoading(false)
            cartCXT.setCart([])
            Cookies.remove("cart")
            window.alert("Order successful! Check your email for confirmation.")
        } catch (error) {
            setIsLoading(false)
            setError({state: true, message: "Server connection error."})
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
            {
                error.state
                ?   <span className="error-msg">{error.message}</span>
                :   null
            }
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
                        {
                            user === null
                            ?   <span className="error-msg">Log in to place an order</span>
                            :   <LargeActionBtn 
                                    isLoading={isLoading} 
                                    error={error} 
                                    action={handleSubmitOrder}
                                >
                                    {"Place order"}
                                </LargeActionBtn>
                        }
                    </>
                :
                    null
            }
        </motion.div>
    )
}

export default CartContainer