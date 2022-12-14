import "./Sass/CartContainer.scss"
import { motion } from "framer-motion"
import { useContext, useState } from "react"
import { BlurContext, UserContext } from "../../../contexts/global"
import { CartContext } from "../../../contexts/cart"

const CartContainer = ()=>{

    const userCXT = useContext(UserContext)
    let user = userCXT.value
    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value
    const cartCXT = useContext(CartContext)
    let cart = cartCXT.value

    const [cartExpanded, setCartExpanded] = useState(false)

    return(
        <motion.div id="cart-container">
            {
                cartExpanded
                ?   null //expanded container here
                :   <div id="collapsed-cart-container">
                        <div>
                            Expand Btn
                        </div>
                        <div>
                            Current Price
                        </div>
                        <div>
                            Cart Icon
                        </div>
                    </div>
            }
        </motion.div>
    )
}

export default CartContainer