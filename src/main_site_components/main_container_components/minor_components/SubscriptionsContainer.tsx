import { useContext, useEffect, useState } from "react"
import { BlurContext } from "../../../contexts/global"
import { CartContext } from "../../../contexts/cart"
import { serverURL } from "../../../App"

const SubscriptionsContainer = ()=>{

    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    //data states
    const [ subsDB, setSubsDB ] = useState([])
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

    return(
        <div id="subscriptions-container">
            Subs container
        </div>
    )
}

export default SubscriptionsContainer