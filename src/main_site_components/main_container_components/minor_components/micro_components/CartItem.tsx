import "./Sass/CartItem.scss";

interface CartItemProps{
    element: any,
    index: any
}

const CartItem = (props: CartItemProps)=>{

    let {
        element,
        index
    } = props

    let { item, qty } = element

    return(
        <div id="cart-item-container">
            <div id="desc-container">
                <span id="item-name">{item.name}</span>
                <span>ID: {item.item_id}</span>
            </div>
            <div id="info-container">
                <span id="price">${item.price}</span>
                <span id="qty">x{qty}</span>
            </div>
        </div>
    )
}

export default CartItem