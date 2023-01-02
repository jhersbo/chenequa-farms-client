import Cookies from "js-cookie";
import { useContext, useReducer, useState } from "react";
import { CartContext } from "../../../../contexts/cart";
import { BlurContext, UserContext } from "../../../../contexts/global";
import "./Sass/ItemCard.scss";


import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';

interface ItemCardProps{
    element: {
        item_id: string,
        category_id: string,
        description: string,
        name: string,
        number_remaining: number,
        photo_path: string, 
        price: number
    }

    index: number
}

const shoppingCartSXProps = {
    fontSize: "32px",
    color: "#01B763",
    cursor: "pointer"
}

const arrowDropSXProps = {
    color: "grey"
}

const itemSelectReducer = (state: any, action: any)=>{
    switch(action.type){
        case "increment_number":
            return state + 1;
        case "decrement_number":
            if(state > 0){
                return state - 1
            }
            return state
        case "zero":
            return state - state
        default:
            return state
    }
}

const ItemCard = (props: ItemCardProps)=>{

    let {
        element,
        index
    } = props

    let userCXT = useContext(UserContext)
    let user = userCXT.value

    let blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    let cartCXT = useContext(CartContext)
    let cart = cartCXT.value

    const [qty, dispatch] = useReducer(itemSelectReducer, 0)

    const [descOpen, setDescOpen] = useState(false)

    const addItemToCart = ()=>{
        //if no qty, do nothing
        if(qty === 0) return
        //set qty counter to zero
        dispatch({type: "zero"})
        //if cart is empty, push element to the cart
        if(cart.length === 0){
            cartCXT.setCart([{
                item: element,
                qty: qty
            }])
            Cookies.set("cart", JSON.stringify([{
                    item: element,
                    qty: qty
                }])
            )
            return
        }
        //check to see if cart contains our target element
        //returns the element if true, undefined if false
        let containsElement = cart.find(
            (el: any) => el.item.item_id === element.item_id
        )
        //make a new, mutable variable
        let mutCart = cart
        if(containsElement){
            let oldQty = containsElement.qty
            //replace old target element with new one with updated qty
            mutCart.splice(
                mutCart.indexOf(containsElement), 
                1, 
                {
                    ...containsElement, 
                    qty: oldQty + qty
                }
            )
            cartCXT.setCart([...mutCart])
            Cookies.set("cart", JSON.stringify([...mutCart]))
            return
        }

        //default action
        cartCXT.setCart([...mutCart, {item: element, qty: qty}])
        Cookies.set("cart", JSON.stringify([
            ...mutCart, 
            {item: element, qty: qty}
        ]))
        return
    }

    return(
        <div 
            style={{
                border: "1px solid black"
            }}
            className="item-card"
            key={`card-${element.item_id}`}
        >
            <img
                className="item-img" 
                src={element.photo_path} 
                alt={element.name}
            />
            <div
                className="card-content"
            >
                <h4>{element.name}</h4>
                <h5 
                    className="collapsable-desc"
                    onClick={()=>{setDescOpen(!descOpen)}}
                >
                    <em className="desc">Description</em>
                    {
                        descOpen 
                        ? <ArrowDropUpIcon sx={arrowDropSXProps}/> 
                        : <ArrowDropDownIcon sx={arrowDropSXProps}/>
                    }
                </h5>
                {
                    descOpen
                    ?   <p id="desc-text">
                            {element.description}
                        </p>
                    :   null
                }
                <span id="price">
                    ${element.price}
                </span>
            </div>
            {
                user
                ?   <div className="card-action-btns">
                        <div className="increment-btns">
                            <button
                                onClick={()=>{
                                    dispatch({type: "increment_number"})
                                }}
                                disabled={blur}
                                aria-label="increment"
                            >+</button>
                            <span>Qty:&nbsp;{qty}</span>
                            <button
                                onClick={()=>{
                                    dispatch({type: "decrement_number"})
                                }}
                                disabled={blur}
                                aria-label="decrement"
                            >-</button>
                        </div>
                        <Tooltip title="Add to cart" placement="left" arrow>
                            <ShoppingCartIcon sx={shoppingCartSXProps} onClick={()=>{addItemToCart()}}/>
                        </Tooltip>
                    </div>
                :   <h6 id="logged-out-msg">Log in to make purchases!</h6>
            }
        </div>
    )
}

export default ItemCard