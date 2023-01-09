import Cookies from "js-cookie"
import { useContext, useEffect, useState } from "react"
import { Bars } from "react-loader-spinner"
import { BlurContext, UserContext } from "../../../contexts/global"
import { serverURL } from "../../../utils/serverURL"
import "./Sass/SubscriptionsContainer.scss"
import ConfirmSubPopup from "./micro_components/ConfirmSubPopup"
import SubSubmittedPopup from "./micro_components/SubSubmittedPopup"
import SubscriptionCard from "./micro_components/SubscriptionCard"

export type SubElement = {
    description: string,
    name: string,
    number_available: number,
    photo_path: string,
    price: number,
    sub_type_id: string
}

export type ResponseData = {
    active: boolean,
    price: number,
    purch_date: string,
    renew_date: string,
    sub_id: string,
    sub_name: string,
    sub_type_id: string,
    user_id: string
}

const SubscriptionsContainer = ()=>{

    const userCXT = useContext(UserContext)
    let user = userCXT.value
    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    //data states
    const [ subsDB, setSubsDB ] = useState([])
    //user-driven states
    const [ subClicked, setSubClicked ] = useState<SubElement | null>(null)
    const [ subConfirmed, setSubConfirmed ] = useState(false)
    const [ responseData, setResponseData ] = useState<ResponseData | null>(null)
    //feedback states
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState({state: false, message: ""})

    useEffect(()=>{
        setIsLoading(true)
        const getSubs = async ()=>{
            try{
                let response = await fetch(serverURL + "sub_types")
                let parsedResponse = await response.json()
                if(!parsedResponse.success){
                    setIsLoading(false)
                    setError({
                        state: true, 
                        message: "Error getting subs from server."
                    })
                    return
                }
                setIsLoading(false)
                setSubsDB(parsedResponse.data)
            }catch(err){
                setIsLoading(false)
                setError({
                    state: true, 
                    message: "Error connecting to the server."
                })
            }
        }
        getSubs()
    }, [])

    const handleCancelBtn = ()=>{
        setSubClicked(null)
        setSubConfirmed(false)
    }

    //confirm and submit subscription
    const handleSubmitSubscription = async ()=>{
        setIsLoading(true)
        if(!Cookies.get("token")){
            setIsLoading(false)
            setError({state: true, message: "Invalid or absent authentication token. Please log in again."})
        }
        try{
            let response = await fetch(serverURL + "subscriptions",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse((Cookies.get("token")) as string)}`
                },
                body: JSON.stringify({...subClicked, user_id: user.user_id})
            })
            let parsedResponse = await response.json()
            console.log(parsedResponse)
            if(!parsedResponse.success){
                setIsLoading(false)
                setError({state: true, message: parsedResponse.message})
                return
            }
            setIsLoading(false)
            setSubClicked(null)
            setSubConfirmed(true)
            setResponseData(parsedResponse.data) 
        }catch(error){
            setIsLoading(false)
            setError({state: true, message: "Server error."})
        }
    }

    //no subs in DB
    if(subsDB.length === 0){
        return(
            <div id="subscriptions-container">
                No subscriptions currently available
            </div>
        )
    }

    //sub has been clicked and buffered
    if(subClicked){
        return(
            <ConfirmSubPopup 
                subClicked={subClicked} 
                handleCancelBtn={handleCancelBtn} 
                handleSubmitSubscription={handleSubmitSubscription}
                isLoading={isLoading}
                error={error}
            />
        )
    }

    //sub has been confirmed
    if(subConfirmed){
        return(
            <SubSubmittedPopup
                responseData={responseData}
                setResponseData={setResponseData}
                setSubConfirmed={setSubConfirmed}
            />
        )
    }

    //default return
    return(
        <div 
            id="subscriptions-container" 
        >
            {/* come back to this */}
            {
                isLoading
                ?   <Bars/>
                :   null
            }
            {
                error.state
                ?   <span className="error-msg">{error.message}</span>
                :   null
            }
            {
                subsDB.map((el: SubElement, index: number)=>{
                    return(
                        <SubscriptionCard 
                            key={`sub-card-${index}`} 
                            element={el} 
                            index={index} 
                            setSubClicked={setSubClicked}
                        />
                    )
                })
            }
        </div>
    )
}

export default SubscriptionsContainer