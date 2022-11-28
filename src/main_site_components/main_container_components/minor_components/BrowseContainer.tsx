import "./Sass/BrowseContainer.scss"

import { useState, useEffect } from "react"

import { serverURL } from "../../../App"

import CategoryMenu from "./CategoryMenu"
import ItemContainer from "./ItemContainer"

export interface CategoryTypes{
    category_id: string, 
    category_name: string, 
    category_thumbnail: string
}

interface BrowseContainerProps{
    blur: boolean
}

const BrowseContainer = (props: BrowseContainerProps)=>{

    let { blur } = props

    const [ categoryDB, setCategoryDB ] = useState([])
    const [ category, setCategory ] = useState<number | null>(null)
    const [ error, setError ] = useState({state: false, message: ""})
    const [ isLoading, setIsLoading ] = useState(false)

    const [ catCollapsed, setCatCollapsed ] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        const retrieveCategories = async ()=>{
            try{
                let response = await fetch(serverURL + "categories")
                let parsedResponse = await response.json()
                
                console.log(parsedResponse)
    
                if(!parsedResponse.success){
                    setIsLoading(false)
                    setError({
                        state: true,
                        message: "Error retrieving category data."
                    })
                    return
                }
                setCategoryDB(parsedResponse.data)
                setIsLoading(false)
            }catch(err){
                setIsLoading(false)
                setError({
                    state: true,
                    message: "Error connecting to server."
                })
            }
            return
        }
        retrieveCategories()
        return
    }, [])

    return(
        <div id="browse-container">
            <CategoryMenu
                categoryDB={categoryDB}
                setCategory={setCategory}
                category={category}
                setError={setError}
                error={error}
                catCollapsed={catCollapsed}
                setCatCollapsed={setCatCollapsed}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                blur={blur}
            />
            <ItemContainer
                catCollapsed={catCollapsed}
                setCatCollapsed={setCatCollapsed}
                categoryDB={categoryDB}
                category={category}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                blur={blur}
            />
        </div>
    )
}

export default BrowseContainer