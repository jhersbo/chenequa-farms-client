import "./Sass/CartContents.scss";

interface CartContentsProps{
    children: JSX.Element | string
}

const CartContents = (props: CartContentsProps)=>{
    let { children } = props

    return(
        <div id="cart-contents">
            {children}
        </div>
    )
}

export default CartContents