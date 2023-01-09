import "./Sass/SubSubmittedPopup.scss";
import { useContext } from "react"
import PopupWindow from "../PopupWindow"
import { UserContext } from "../../../../contexts/global";
import { ResponseData } from "../SubscriptionsContainer";
import WidgetBtn from "./WidgetBtn";

interface SubSubmittedPopupProps{
    responseData: ResponseData | null,
    setResponseData: React.Dispatch<React.SetStateAction<ResponseData | null>>,
    setSubConfirmed: React.Dispatch<React.SetStateAction<boolean>>
}

const SubSubmittedPopup = (props: SubSubmittedPopupProps)=>{

    let { responseData, setResponseData, setSubConfirmed } = props

    const userCXT = useContext(UserContext)
    let user = userCXT.value

    let purchDateString = new Date(parseInt(responseData?.purch_date as string)).toString()
    let renewDateString = new Date(parseInt(responseData?.renew_date as string)).toString()

    const handleClose = ()=>{
        setResponseData(null)
        setSubConfirmed(false)
    }

    return(
        <PopupWindow>
            <div id="sub-submitted-container">
                <div id="sub-submitted-content">
                    <span>Subscription Confirmed!</span>
                    <span>You will receive a confirmation email at <u>{user.email_address}.</u></span>
                    <span>Payment will be made at pickup. No further action is required.</span>
                    <br/>
                    <span>
                        <u>Details of your subscription:</u>
                    </span>
                    <br/>
                    <span>Subscription ID: {responseData?.sub_id}</span>
                    <span>Subscription name: {responseData?.sub_name}</span>
                    <span>Price per pickup: ${responseData?.price}</span>
                    <span>Purchase Date: {purchDateString.slice(0, purchDateString.indexOf(":") - 2)}</span>
                    <span>Renewal Date: {renewDateString.slice(0, purchDateString.indexOf(":") - 2)}</span>
                </div>
                <div id="sub-submitted-actions">
                    <WidgetBtn action={handleClose}>
                        Close
                    </WidgetBtn>
                </div>
            </div>
        </PopupWindow>
    )
}

export default SubSubmittedPopup