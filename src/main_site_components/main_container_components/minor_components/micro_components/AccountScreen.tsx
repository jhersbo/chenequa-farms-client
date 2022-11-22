import "../Sass/AccountWidget.scss";
import "./Sass/AccountScreen.scss";

import { useContext } from "react";
import { UserContext } from "../../../../contexts/global";

import CloseBtn from "./CloseBtn";

interface AccountScreenProps{
    handleCloseBtn: ()=> void
}

const AccountScreen = (props: AccountScreenProps)=>{

    let {
        handleCloseBtn
    } = props

    const user = useContext(UserContext)

    return(
        <div id="login-container">
            <CloseBtn handleCloseBtn={handleCloseBtn}/>
            <h3>Your account</h3>
            <ul id="account-ul">
                <li>
                    <u>Name</u>{`: ${user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)} ${user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)}`}
                </li>
                <li>
                    <u>Email address</u>{`: ${user.email_address}`}
                </li>
                <li>
                    <u>Phone number</u>{`: ${user.phone_number}`}
                </li>
            </ul>
            <div id="user-orders-container">
                <h5>Orders</h5>
                <table style={{
                    border: "1px solid black",
                    width: "100%",
                    textAlign: "left"
                }}>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Content</th>
                        <th>Price</th>
                        <th>Filled?</th>
                    </tr>
                    {
                        user.user_orders.map((element: any, index: number)=>{
                            return(
                                <tr key={`table-row-${index}`}>
                                    <td>{element.order_id}</td>
                                    <td>Order content</td>
                                    <td>${element.order_price}</td>
                                    <td>{element.filled ? "Yes" : "No"}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div id="user-subs-container">
                <h5>Subscriptions</h5>
            </div>
        </div>
    )
}

export default AccountScreen