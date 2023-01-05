import { useContext, useEffect, useState } from "react"
import { Bars } from "react-loader-spinner"
import { BlurContext } from "../../../contexts/global"
import { serverURL } from "../../../utils/serverURL"
import "./Sass/SubscriptionsContainer.scss"
import SubscriptionCard from "./micro_components/SubscriptionCard"

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

    console.log(subsDB)

    if(subsDB.length === 0){
        return(
            <div id="subscriptions-container">
                No subscriptions currently available
            </div>
        )
    }

    return(
        <div 
            id="subscriptions-container" 
            // style={blurCXT?.payload}
        >
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
                subsDB.map((el: any, index: number)=>{
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