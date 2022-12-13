import "./Sass/ItemContainer.scss"

import { CategoryTypes } from "./BrowseContainer"
import { BlurContext, ScreenSizeContext } from "../../../contexts/global"
import { useEffect, useState, useContext } from "react"

import Grid from '@mui/material/Grid';
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
                    <div
                        className="item-display-box"
                    >

                        {
                            items.map((element: any, index: number)=>{
                                return(
                                    <ItemCard key={index} element={element} index={index}/>
                                )
                            })
                        }
                    </div>

                :
                    <>
                        Select a category to start browsing!
                    </>
            }
        </div>
    )
}

export default ItemContainer