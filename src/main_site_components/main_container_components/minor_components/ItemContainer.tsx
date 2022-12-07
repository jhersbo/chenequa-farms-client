import "./Sass/ItemContainer.scss"

import { CategoryTypes } from "./BrowseContainer"
import { BlurContext } from "../../../contexts/global"
import { useEffect, useState, useContext } from "react"

interface ItemContainerProps{
    catCollapsed: boolean,
    setCatCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
    categoryDB: CategoryTypes[],
    category: number | null,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ItemContainer = (props: ItemContainerProps)=>{

    const [ currentItems, setCurrentItems ] = useState(null)
    
    let {
        catCollapsed,
        setCatCollapsed,
        categoryDB,
        category,
        isLoading,
        setIsLoading
    } = props

    const blurCXT = useContext(BlurContext)
    let blur = blurCXT?.value

    if(category !== null){
        let selectedCategory = categoryDB[category]
        console.log(selectedCategory)
        let items = selectedCategory.inventories
        console.log(items)
    }

    return(
        <div id="item-container" style={{
            width: catCollapsed ? "90vw" : "72vw"
        }}>
            Item Container
        </div>
    )
}

export default ItemContainer