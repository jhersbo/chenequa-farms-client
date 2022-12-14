import "./Sass/ItemCard.scss"
import { useContext, useReducer, useState } from "react"
import { BlurContext, UserContext } from "../../../../contexts/global"

import { motion } from "framer-motion"

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Fab from '@mui/material/Fab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Tooltip from '@mui/material/Tooltip';
import WidgetBtn from "./WidgetBtn"

interface ItemCardProps{
    element: {
        item_id: string,
        category_id: string,
        description: string,
        name: string,
        number_remaining: number,
        photo_path: string, 
        price: string
    }

    index: number
}

const fabSXProps = {
    backgroundColor: "#01B763",
    fontSize: "32px",
    display: "flex",
    alignItems: "center",
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

    const [qty, dispatch] = useReducer(itemSelectReducer, 0)

    const [descOpen, setDescOpen] = useState(false)

    const addItemToCart = ()=>{

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
                                // size="small"
                                // sx={fabSXProps}
                            >+</button>
                            <span>Qty:&nbsp;{qty}</span>
                            <button
                                onClick={()=>{
                                    dispatch({type: "decrement_number"})
                                }}
                                disabled={blur}
                                aria-label="decrement"
                                // size="small"
                                // sx={fabSXProps}
                            >-</button>
                        </div>
                        <Tooltip title="Add to cart" placement="left" arrow>
                            <ShoppingCartIcon sx={shoppingCartSXProps}/>
                        </Tooltip>
                    </div>
                :   <h6 id="logged-out-msg">Log in to make purchases!</h6>
            }
        </div>
    )
}

export default ItemCard