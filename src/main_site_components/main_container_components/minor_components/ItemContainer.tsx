import "./Sass/ItemContainer.scss"

import { CategoryTypes } from "./BrowseContainer"

import { useEffect, useState } from "react"

interface ItemContainerProps{
    catCollapsed: boolean,
    setCatCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
    categoryDB: CategoryTypes[],
    category: number | null,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    blur: boolean
}

const ItemContainer = (props: ItemContainerProps)=>{

    const [ currentItems, setCurrentItems ] = useState(null)
    
    let {
        catCollapsed,
        setCatCollapsed,
        categoryDB,
        category,
        isLoading,
        setIsLoading,
        blur
    } = props

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