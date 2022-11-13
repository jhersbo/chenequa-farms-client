import "./Sass/AccountWidget.scss"

import { useContext } from "react"
import { UserContext, UserContextInterface } from "../../../contexts/global"
import Cookies from "js-cookie"

interface AccountWidgetProps{
    setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>
}

const AccountWidget = ({ setUser }: AccountWidgetProps)=>{

    const user = useContext(UserContext)

    const handleSignOut = ()=>{
        setUser(null)
        Cookies.set("user", "")
    }

    const handleLogin = ()=>{

    }

    return(
        <div className="widget-container">
            {
                user ?
                    <div id="signed-in-container">
                        <div>
                            <h5 id="greeting">
                                {"Welcome, " + user.first_name}
                            </h5>
                        </div>
                        <div className="btn-container">
                            <button className="widget-btn" aria-label="log out" onClick={()=>{handleSignOut()}}>Log Out</button>
                            <button className="widget-btn" aria-label="log out">Account</button>
                        </div>
                    </div>
                :
                    <div id="signed-in-container">
                        <div>
                            <h5 id="greeting">
                                Welcome, guest.
                            </h5>
                        </div>
                        <div className="btn-container">
                            <button className="widget-btn" aria-label="log out" onClick={()=>{handleLogin()}}>Log In</button>
                            <button className="widget-btn" aria-label="log out">Register</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default AccountWidget