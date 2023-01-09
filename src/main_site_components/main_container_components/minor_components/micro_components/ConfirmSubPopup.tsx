import { SubElement } from "../SubscriptionsContainer";
import "./Sass/ConfirmSubPopup.scss";
import WidgetBtn from "./WidgetBtn";
import PopupWindow from "../PopupWindow";
import { Bars } from "react-loader-spinner";

interface ConfirmSubProps{
    subClicked: SubElement
    handleCancelBtn: ()=>void
    handleSubmitSubscription: ()=>void
    isLoading: boolean
    error: {state: boolean, message: string}
}

const ConfirmSubPopup = (props: ConfirmSubProps)=>{

    let { 
            subClicked, 
            handleCancelBtn, 
            handleSubmitSubscription,
            isLoading,
            error 
        } = props

    return(
        <PopupWindow>
                <div id="confirm-sub-container">
                {
                    isLoading
                    ?   <Bars
                            height={20}
                            width={20}
                            color="#01B763"
                        />
                    :   null
                }
                {
                    error.state
                    ?   <span className="error-msg">Error:{error.message}</span>
                    :   null
                }
                    <div id="confirm-sub-content">
                        <span>Confirm Subscription?</span>
                        <span>Below are the details of this subscription:</span>
                        <span>
                            <u>Type:</u>&nbsp;{subClicked.name}
                        </span>
                        <span>
                            <u>Description:</u>&nbsp;{subClicked.description}
                        </span>
                        <span>
                            <u>Price per pickup:</u>&nbsp;${subClicked.price}
                        </span>
                    </div>
                    <div id="confirm-sub-actions">
                        <WidgetBtn 
                            action={handleCancelBtn}
                            disabledBool={isLoading}
                        >
                            Cancel
                        </WidgetBtn>
                        <WidgetBtn 
                            action={handleSubmitSubscription}
                            disabledBool={isLoading}
                        >
                            Confirm
                        </WidgetBtn>
                    </div>
                </div>
            </PopupWindow>
    )
}

export default ConfirmSubPopup