import "./Sass/OrderSubTables.scss";

import { UserContext } from "../../../../contexts/global"
import { useContext, useState } from "react"

const OrderSubTables = ()=>{
    
    const userCXT = useContext(UserContext)
    let user = userCXT.value

    const [ page, setPage ] = useState("orders")

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
                                    <th>Filled?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user.user_orders.map((element: any, index: number)=>{
                                        return(
                                            <tr key={`order-table-row-${index}`}>
                                                <td>{element.order_id}</td>
                                                <td>
                                                    <ul>
                                                        {
                                                            element.order_content.map((element: any, index: number)=>{
                                                                let parsedElement = JSON.parse(element)
                                                                
                                                                return(
                                                                    <li key={`order-content-${index}`}>
                                                                        {`${parsedElement.name} (${parsedElement.qty})`}
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </td>
                                                <td>${element.order_price}</td>
                                                <td>{element.filled ? "Yes" : "No"}</td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    user.user_orders.length === 0
                                    ? <h4>You have no orders yet!</h4>
                                    : null
                                }
                            </tbody>
                        </table>
                    :
                        <table>
                            <thead>
                                <th>Subscription ID</th>
                                <th>Type</th>
                                <th>Rate</th>
                                <th>Active?</th>
                                <th>Purchase Date</th>
                                <th>Renew Date</th>
                            </thead>
                            <tbody>
                                {
                                    user.subscriptions.map((element: any, index: number)=>{
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
                                    user.subscriptions.length === 0
                                    ? <h4>You have no subscriptions yet!</h4>
                                    : null
                                }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

export default OrderSubTables