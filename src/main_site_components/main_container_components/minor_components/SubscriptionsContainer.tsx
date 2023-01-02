import { useContext } from "react"
import { BlurContext } from "../../../contexts/global"
import { CartContext } from "../../../contexts/cart"

const SubscriptionsContainer = ()=>{

    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    const cartCXT = useContext(CartContext)
    let cart = cartCXT.value

    return(
        <div id="subscriptions-container">
            Subs container
        </div>
    )
}

export default SubscriptionsContainer