import "./Sass/ItemContainer.scss"

import { CategoryTypes } from "./BrowseContainer"

import { useEffect, useState } from "react"

interface ItemContainerProps{
    catCollapsed: boolean,
    setCatCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
    categoryDB: CategoryTypes[],
    category: number | null
}

const ItemContainer = (props: ItemContainerProps)=>{

    const [ currentItems, setCurrentItems ] = useState(null)
    
    let {
        catCollapsed,
        setCatCollapsed,
        categoryDB,
        category
    } = props

    useEffect(()=>{
        if(category !== null){
            let selectedCategory = categoryDB[category]
            let ID = selectedCategory.category_id

            //api call here
        }
    }, [category, categoryDB])

    return(
        <div id="item-container" style={{
            width: catCollapsed ? "90vw" : "72vw"
        }}>
            Item Container
        </div>
    )
}

export default ItemContainer