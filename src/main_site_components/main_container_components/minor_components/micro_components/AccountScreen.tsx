import { useContext } from "react";
import { UserContext } from "../../../../contexts/global";
import "../Sass/AccountWidget.scss";
import AccountTables from "./AccountTables";
import CloseBtn from "./CloseBtn";
import "./Sass/AccountScreen.scss";

interface AccountScreenProps{
    handleCloseBtn: ()=> void
}

const AccountScreen = (props: AccountScreenProps)=>{

    let {
        handleCloseBtn
    } = props

    const userCXT = useContext(UserContext)
    let user = userCXT.value

    return(
        <div id="account-container">
            <CloseBtn handleCloseBtn={handleCloseBtn}/>
            <h3>Your account</h3>
            <ul id="account-ul">
                {
                    user.is_admin ?
                        <li>
                            <em>Administrator</em>
                        </li>
                    :
                        null
                }
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
            <AccountTables/>
        </div>
    )
}

export default AccountScreen