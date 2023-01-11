import CenteredLoadingBars from "./CenteredLoadingBars";
import "./Sass/AccountTables.scss";

interface OrderTablesProps{
    isLoading: boolean
    error: {
        state: boolean,
        message: string
    }
    orders: {
        order_id: string,
        user_id: string,
        order_price: number,
        order_content: string[],
        filled: boolean,
        date_created: string,
        date_filled: string | null
    }[] | never[]
}

const OrderTable = (props: OrderTablesProps)=>{

    let { isLoading, error, orders } = props

    return(
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
                        <CenteredLoadingBars/>
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
    )
}

export default OrderTable