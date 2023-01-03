import PopupWindow from "./PopupWindow"
import { useContext, useEffect, useState } from "react"
import { BlurContext } from "../../../contexts/global"
import { serverURL } from "../../../App"

const SubscriptionsContainer = ()=>{

    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    //data states
    const [ subsDB, setSubsDB ] = useState([])
    //user-driven states
    const [ subClicked, setSubClicked ] = useState()
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


    if(subsDB.length === 0){
        return(
            <div id="subscriptions-container">
                No subscriptions currently available
            </div>
        )
    }

    return(
        <div id="subscriptions-container">
            <PopupWindow>
                <div>
                    <span>Popup Window</span>
                </div>
            </PopupWindow>
        </div>
    )
}

export default SubscriptionsContainer