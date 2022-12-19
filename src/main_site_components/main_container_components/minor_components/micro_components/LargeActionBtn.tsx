import "./Sass/LargeActionBtn.scss"

import { useContext } from "react"
import { CartContext } from "../../../../contexts/cart"
import { Bars } from "react-loader-spinner"


interface LargeActionBtnProps{
    children: JSX.Element | string,
    isLoading: boolean,
    error: {
        state: boolean,
        message: string
    },
    action: () => void
}

const barsStyleProps = {
    height: "24px",
    color: "black"
}

const LargeActionBtn = (props: LargeActionBtnProps)=>{

    let { 
        children,
        isLoading,
        error,
        action 
    } = props

    const cartCXT = useContext(CartContext)
    let cart = cartCXT.value

    return(
        <button 
            id="lg-action-btn"
            aria-label="submit order"
            disabled={isLoading || cart.length === 0}
            onClick={()=>{
                action()
            }}
        >
            {
                isLoading
                ?   <Bars 
                        height={barsStyleProps.height}
                        color={barsStyleProps.color}
                    />
                :   <span>{children}</span>
            }   
        </button>
    )
}

export default LargeActionBtn