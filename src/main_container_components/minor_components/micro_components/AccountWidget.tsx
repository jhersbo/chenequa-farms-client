import { useContext } from "react"
import { UserContext, UserContextInterface } from "../../../contexts/global"

interface AccountWidgetProps{
    setUser: React.Dispatch<React.SetStateAction<UserContextInterface | null>>
}

const AccountWidget = ({ setUser }: AccountWidgetProps)=>{

    const user = useContext(UserContext)

    return(
        <div>
            {
                user ?
                    <div>
                        <p>
                            {"Welcome, " + user.first_name}
                        </p>
                    </div>
                :
                    <p>
                        Welcome, guest.
                    </p>
            }
        </div>
    )
}

export default AccountWidget