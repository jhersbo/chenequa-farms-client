import "./Sass/CartContainer.scss"
import { motion } from "framer-motion"
import { useContext, useState } from "react"
import { BlurContext, UserContext } from "../../../contexts/global"

const CartContainer = ()=>{

    const userCXT = useContext(UserContext)
    let user = userCXT.value
    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    const [cartExpanded, setCartExpanded] = useState(false)

    return(
        <motion.div id="cart-container">
            <div>
                Expand Btn
            </div>
            <div>
                Current Price
            </div>
            <div>
                Cart Icon
            </div>
        </motion.div>
    )
}

export default CartContainer