import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Tooltip from '@mui/material/Tooltip';
import { useContext, useState } from "react";
import { BlurContext, UserContext } from "../../../../contexts/global";
import { SubElement } from "../SubscriptionsContainer";
import "./Sass/SubscriptionCard.scss";

interface SubCardPropTypes{
    element: SubElement
    index: number
    setSubClicked: React.Dispatch<React.SetStateAction<SubElement | null>>
}

const arrowDropSXProps = {
    color: "grey"
}

const shoppingCartSXProps = {
    fontSize: "32px",
    color: "#01B763",
    cursor: "pointer"
}

const SubscriptionCard = (props: SubCardPropTypes)=>{

    let { element, index, setSubClicked } = props

    const [ descOpen, setDescOpen ] = useState(false)

    const userCXT = useContext(UserContext)
    let user = userCXT.value
    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    const bufferSubscription = (element: SubElement)=>{
        setSubClicked(element)
    }

    return (
        <div className="sub-card">
            <img
                className="sub-img" 
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
                <div id="card-price-actions">
                    <span id="price">
                        ${element.price}/pickup
                    </span>
                    {
                        user
                        ?   <Tooltip 
                                title="Reserve subscription"           placement="left" 
                                arrow 
                                disableHoverListener={blur}
                            >
                                <ShoppingCart
                                    sx={shoppingCartSXProps}
                                    onClick={()=>{
                                        bufferSubscription(element)
                                    }}
                                />
                            </Tooltip>
                        :   null   
                    }
                </div>
            </div>
            {
                user
                ?   null
                :   <span id="logged-out-msg">Log in to reserve subscriptions!</span>
            }
        </div>
    )
}

export default SubscriptionCard