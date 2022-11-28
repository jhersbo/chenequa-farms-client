import "./Sass/OrderSubTables.scss";

import { UserContext } from "../../../../contexts/global"
import { useContext, useState } from "react"

const OrderSubTables = ()=>{
    
    const user = useContext(UserContext)

    const [ page, setPage ] = useState("orders")


    return(
        <div id="order-sub-container">
            <div>
                <button onClick={()=>{
                    setPage("orders")
                }}>Orders</button>
                <button onClick={()=>{
                    setPage("subs")
                }}>Subscriptions</button>
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
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

export default OrderSubTables