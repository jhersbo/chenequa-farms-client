import { motion } from "framer-motion"
import Cookies from "js-cookie"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../../contexts/cart"
import { BlurContext, UserContext } from "../../../contexts/global"
import { serverURL } from "../../../utils/serverURL"
import "./Sass/CartContainer.scss"

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PopupWindow from "./PopupWindow"
import CartContents from "./micro_components/CartContents"
import CartItem from "./micro_components/CartItem"
import LargeActionBtn from "./micro_components/LargeActionBtn"
import WidgetBtn from "./micro_components/WidgetBtn"

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
    const [orderSuccess, setOrderSuccess] = useState(false)

    useEffect(()=>{
        //toggles blur when order success is true
        if(orderSuccess){
            blurCXT?.setBlur(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderSuccess])

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
            setOrderSuccess(true)
        } catch (error) {
            setIsLoading(false)
            setError({state: true, message: "Server connection error."})
        }
    }

    const closePopup = ()=>{
        blurCXT?.setBlur(false)
        setOrderSuccess(false)
    }

    if(orderSuccess){
        return(
            <PopupWindow>
                <div id="cart-popup-container">
                    <div id="cart-popup-content">
                        <span>Order successful!</span>
                        <span>A confirmation email has been sent to: <u>{user?.email_address}</u>.</span>
                        <span>No further action is needed at this time.</span>
                    </div>
                    <div id="cart-popup-actions">
                        <WidgetBtn
                            action={closePopup}
                        >
                            Close
                        </WidgetBtn>
                    </div>
                </div>
            </PopupWindow>
        )
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
            style={blurCXT?.payload}
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
                            disabled={blur}
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
                            disabled={blur}
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