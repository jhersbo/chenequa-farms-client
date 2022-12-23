import Cookies from "js-cookie";
import { useContext } from "react";
import { CartContext } from "../../../../contexts/cart";
import "./Sass/CartItem.scss";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';

interface CartItemProps{
    element: any,
    index: number
}

const deleteIconSXProps = {
    color: "red",
}


const CartItem = (props: CartItemProps)=>{

    let {
        element,
        index
    } = props

    let { item, qty } = element

    const cartCXT = useContext(CartContext)
    let cart = cartCXT.value

    //handler to remove an item from the cart
    const removeItemFromCart = ()=>{
        if(cart.length === 0) return;
        //find target item
        let targetItem = cart.find(
            (el: any) => el === element
        )
        if(!targetItem) return;
        //mutable store for cart variable
        let mutCart = cart
        //splice out target item
        mutCart.splice(mutCart.indexOf(targetItem), 1)
        //update state
        cartCXT.setCart([...mutCart])
        //update cookie
        Cookies.set("cart", JSON.stringify([...mutCart]))
    }

    return(
        <div id="cart-item-container">
            <Tooltip arrow placement="left" title="Remove item">
                <button
                    className="style-free-btn cart-delete-btn"
                    aria-label="remove item from your cart"
                    onClick={()=>{
                        removeItemFromCart()
                    }}
                >
                    <DeleteForeverIcon sx={deleteIconSXProps}/>
                </button>
            </Tooltip>
            <div className="flex-space-between">
                <div id="desc-container">
                    <span id="item-name">{item.name}</span>
                    <span>ID: {item.item_id}</span>
                </div>
                <div id="info-container">
                    <span id="price">${item.price}</span>
                    <span id="qty">x{qty}</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem