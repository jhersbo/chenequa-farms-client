import "./Sass/ItemContainer.scss";

import { useContext } from "react";
import { BlurContext } from "../../../contexts/global";
import { CategoryTypes } from "./BrowseContainer";

import ItemCard from "./micro_components/ItemCard";
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

    let selectedCategory, items;
    if(category !== null){
        selectedCategory = categoryDB[category]
        items = selectedCategory.inventories
    }

    return(
        <div id="item-container" style={blurCXT?.payload}>
            {
                items ?
                    <div
                        className="item-display-box"
                    >

                        {
                            items.map((element: any, index: number)=>{
                                return(
                                    <ItemCard key={`item-card-${index}`} element={element} index={index}/>
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