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

    const [ catCollapsed, setCatCollapsed ] = useState(false)

    useEffect(()=>{
        const retrieveCategories = async ()=>{
            let response = await fetch(serverURL + "categories")
            let parsedResponse = await response.json()
            
            console.log(parsedResponse)

            if(!parsedResponse.success){
                setError({
                    state: true,
                    message: "Error retrieving data."
                })
                return
            }
    
            setCategoryDB(parsedResponse.data)
            return
        }
        retrieveCategories()
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
            />
            <ItemContainer
                catCollapsed={catCollapsed}
                setCatCollapsed={setCatCollapsed}
                categoryDB={categoryDB}
                category={category}
            />
        </div>
    )
}

export default BrowseContainer