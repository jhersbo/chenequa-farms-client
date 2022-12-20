import "./Sass/OrderSubTables.scss";

import { UserContext } from "../../../../contexts/global"
import { useContext, useState, useEffect } from "react"
import { serverURL } from "../../../../App";

import { Bars } from "react-loader-spinner";

const OrderSubTables = ()=>{
    
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
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Content</th>
                                    <th>Total Price</th>
                                    <th>Order date</th>
                                    <th>Filled?</th>
                                </tr>
                            </thead>
                            {
                                isLoading
                                ?   <tbody>
                                        <Bars/>
                                    </tbody>
                                :   <tbody>
                                        {
                                            error.state
                                            ?   <span>{error.message}</span>
                                            :   orders.map((element: any, index: number)=>{
                                                    return(
                                                        <tr key={`order-table-row-${index}`}>
                                                            <td>{element.order_id}</td>
                                                            <td>
                                                                <ul>
                                                                    {
                                                                        element.order_content.map((element: any, index: number)=>{
                                                                            let parsedElement = JSON.parse(element)
                                                                            let { item, qty } = parsedElement
                                                                            return(
                                                                                <li key={`order-content-${index}`}>
                                                                                    {`${item.name} (${qty})`}
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </td>
                                                            <td>${element.order_price}</td>
                                                            <td>{element.date_created.slice(0, element.date_created.indexOf("GMT"))}</td>
                                                            <td>{element.filled ? "Yes" : "No"}</td>
                                                        </tr>
                                                    )
                                                })
                                        }
                                        {
                                            orders.length === 0 && !error.state
                                            ? <span>You have no orders yet!</span>
                                            : null
                                        }
                                    </tbody>
                            }
                        </table>
                    :
                        <table>
                            <thead>
                                <tr>
                                    <th>Subscription ID</th>
                                    <th>Type</th>
                                    <th>Rate</th>
                                    <th>Active?</th>
                                    <th>Purchase Date</th>
                                    <th>Renew Date</th>
                                </tr>
                            </thead>
                            {
                                isLoading
                                ?   <tbody>
                                        <Bars/>
                                    </tbody>
                                :   <tbody>
                                        {
                                            error.state
                                            ?   <span>{error.message}</span>
                                            :   subs.map((element: any, index: number)=>{
                                                    return(
                                                        <tr key={`sub-table-row-${index}`}>
                                                            <td>{element.sub_id}</td>
                                                            <td>{element.type}</td>
                                                            <td>${element.rate}</td>
                                                            <td>{element.active ? "Yes" : "No"}</td>
                                                            <td>{element.purch_date.slice(0, element.purch_date.indexOf(" "))}</td>
                                                            <td>{element.renew_date.slice(0, element.purch_date.indexOf(" "))}</td>
                                                        </tr>
                                                    )
                                                })
                                        }
                                        {
                                            subs.length === 0 && !error.state
                                            ? <span>You have no subscriptions yet!</span>
                                            : null
                                        }
                                    </tbody>
                            }
                        </table>
                }
            </div>
        </div>
    )
}

export default OrderSubTables