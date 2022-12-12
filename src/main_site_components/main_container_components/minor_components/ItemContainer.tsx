import "./Sass/ItemContainer.scss"

import { CategoryTypes } from "./BrowseContainer"
import { BlurContext } from "../../../contexts/global"
import { useEffect, useState, useContext } from "react"

import Masonry from "@mui/lab/Masonry"
import ItemCard from "./micro_components/ItemCard"
interface ItemContainerProps{
    catCollapsed: boolean,
    setCatCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
    categoryDB: CategoryTypes[],
    category: number | null,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ItemContainer = (props: ItemContainerProps)=>{
    
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

    let selectedCategory, items;

    if(category !== null){
        selectedCategory = categoryDB[category]
        console.log(selectedCategory)
        items = selectedCategory.inventories
        console.log(items)
    }

    return(
        <div id="item-container">
            {
                items ?
                    <Masonry 
                        columns={catCollapsed ? 5 : 4} 
                        spacing={3}
                    >

                        {
                            items.map((element: any, index: number)=>{
                                return(
                                    <ItemCard key={index} element={element} index={index}/>
                                )
                            })
                        }
                    </Masonry>

                :
                    <>
                        Select a category to start browsing!
                    </>
            }
        </div>
    )
}

export default ItemContainer