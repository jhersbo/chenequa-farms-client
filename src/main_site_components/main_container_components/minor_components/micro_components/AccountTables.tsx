import "./Sass/AccountTables.scss";

import { useContext, useEffect, useState } from "react";
import { serverURL } from "../../../../utils/serverURL";
import { UserContext } from "../../../../contexts/global";

import { Bars } from "react-loader-spinner";
import CenteredLoadingBars from "./CenteredLoadingBars";
import OrderTable from "./OrderTable";
import SubTable from "./SubTable";

const AccountTables = ()=>{
    
    const userCXT = useContext(UserContext)
    let user = userCXT.value

    const [ page, setPage ] = useState("orders")
    const [ orders, setOrders ] = useState([])
    const [ subs, setSubs ] = useState([])
    const [ error, setError ] = useState({state: false, message: ""})
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(()=>{
        const retrieveOrders = async ()=>{
            try{
                setIsLoading(true)
                let response = await fetch(serverURL + "user_orders/" + user.user_id)
                let parsedResponse = await response.json()
                if(!parsedResponse.success){
                    setIsLoading(false)
                    setError({state: true, message: parsedResponse.message})
                }
                setOrders(parsedResponse.data)
                setIsLoading(false)
            }catch(err){
                setIsLoading(false)
                setError({state: true, message: "Error connecting to the server."})
            }
        }

        const retrieveSubs = async ()=>{
            try{
                setIsLoading(true)
                let response = await fetch(serverURL + "subscriptions/" + user.user_id)
                let parsedResponse = await response.json()
                if(!parsedResponse.success){
                    setIsLoading(false)
                    setError({state: true, message: parsedResponse.message})
                }
                setSubs(parsedResponse.data)
                setIsLoading(false)
            }catch(err){
                setIsLoading(false)
                setError({state: true, message: "Error connecting to the server."})
            }
        }

        retrieveOrders()
        retrieveSubs()
    }, [user])

    const buttonStyle = {
        orders: {
            backgroundColor: page === "orders" ? "#01B763" : "#005B31",
            boxShadow: page === "orders" ? "0px 0px 5px black" : "inset 0px 0px 4px black"
        },
        subs: {
            backgroundColor: page === "subs" ? "#01B763" : "#005B31",
            boxShadow: page === "subs" ? "0px 0px 5px black" : "inset 0px 0px 2px black"
        }
    }

    return(
        <div id="order-sub-container">
            <div>
                <button
                    className="toggle-btn"
                    style={buttonStyle.orders} 
                    aria-label="orders" 
                    onClick={()=>{
                        setPage("orders")
                    }}>
                        Orders
                </button>
                <button
                    className="toggle-btn"
                    style={buttonStyle.subs}
                    aria-label="subscriptions" 
                    onClick={()=>{
                        setPage("subs")
                    }}>
                        Subscriptions
                </button>
            </div>
            <div className="table-container">
                {
                    page === "orders" ?
                        <OrderTable
                            isLoading={isLoading}
                            error={error}
                            orders={orders}
                        />
                    :
                        <SubTable
                            isLoading={isLoading}
                            error={error}
                            subs={subs}
                        />
                }
            </div>
        </div>
    )
}

export default AccountTables